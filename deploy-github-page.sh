#!/bin/sh

tokenize_and_join() {
    # echo "$1" | sed -E 's/([A-Z])/-\l\1/g' | sed 's/^-\+//'
    echo "$1" | sed -E 's/([A-Z])/-\1/g' | tr '[:upper:]' '[:lower:]' | sed 's/^-\+//'
}

if [ $# -lt 1 ]; then
    echo "Usage: $0 <app folder name>"
    exit 1
fi

token_dir=$(tokenize_and_join "$1")

echo "delete dist/$token_dir"
rm -rf dist/$token_dir
echo "build project $1 starts"
ng build --project=$1
cp ./dist/$token_dir/index.html  ./dist/$token_dir/404.html
touch "./dist/$token_dir/.nojekyll"

git add dist
git commit -m "chore: deploy to github page"

# Split the current 'dist' directory into a local 'gh-pages' branch
git subtree split --prefix dist -b gh-pages

# Force-push the local gh-pages branch to overwrite the remote gh-pages branch
git push -f origin gh-pages:gh-pages

# Delete the temporary local branch
git branch -D gh-pages

echo 'build project finishes'
