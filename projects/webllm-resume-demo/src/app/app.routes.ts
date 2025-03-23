import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cv-analyzer',
        loadComponent: () => import('./llm/cv-analyser/cv-analyzer.component')
    },
    {
        path: 'coder-qa',
        loadComponent: () => import('./llm/coder-qa/coder-qa.component')
    },
    {
        path: 'vision-qa',
        loadComponent: () => import('./llm/vision-qa/vision-qa.component')
    },
    {
        path: 'llm-model-list',
        loadComponent: () => import('./llm/llm-model-list/llm-model-list.component')
    },
    {
        path: '',
        redirectTo: 'cv-analyzer',
        pathMatch: 'full'   
    },
    {
        path: '**',
        redirectTo: 'cv-analyzer'
    }
];
