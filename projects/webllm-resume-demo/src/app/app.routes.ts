import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cv-qa',
        loadComponent: () => import('./llm/cv-qa/components/cv-qa.component')
    },
    {
        path: 'coder-qa',
        loadComponent: () => import('./llm/coder-qa/coder-qa.component')
    },
    {
        path: 'math-qa',
        loadComponent: () => import('./llm/math-qa/math-qa.component')
    },
    {
        path: 'llm-model-list',
        loadComponent: () => import('./llm/llm-model-list/llm-model-list.component')
    },
    {
        path: 'resources',
        loadComponent: () => import('./llm/resources/resources.component')
    },
    {
        path: '',
        redirectTo: 'cv-qa',
        pathMatch: 'full'   
    },
    {
        path: '**',
        redirectTo: 'cv-qa'
    }
];
