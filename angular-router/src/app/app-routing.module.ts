import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/superheroes', pathMatch: 'full' },
    { path: 'compose', component: ComposeMessageComponent, outlet: 'popup'},
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'crisis-center',
        loadChildren: './crisis-center/crisis.module#CrisisCenterModule',
        data: { preload: true}
    },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false,
                preloadingStrategy: SelectivePreloadingStrategyService
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule  {}
