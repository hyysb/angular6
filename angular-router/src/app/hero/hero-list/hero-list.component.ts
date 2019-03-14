import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


import { Hero } from '../../hero';
import { HeroService } from '../../hero.service';

@Component({
    templateUrl: './hero-list.component.html',
    styleUrls: ['hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  selectedId: number;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute
  ) {
    console.log(route);
   }

  ngOnInit() {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log(params.keys);
        this.selectedId = +params.get('id');
        return this.service.getHeroes();
      })
    );
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //       .subscribe(heroes => this.heroes = heroes);
  // }
}
