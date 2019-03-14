import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './hero-routing.module';

import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HeroesRoutingModule
    ],
    declarations: [
        HeroListComponent,
        HeroDetailComponent
    ]
})
export class HeroesModule {}
