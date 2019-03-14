import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


import { Crisis } from '../mock-crisis';
import { CrisisService } from '../crisis.service';

@Component({
    templateUrl: './crisis-list.component.html',
    styleUrls: ['crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  heroes$: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute
  ) {
    console.log(route);
   }

  ngOnInit() {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log(params.keys);
        this.selectedId = +params.get('id');
        return this.service.getCrises();
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
