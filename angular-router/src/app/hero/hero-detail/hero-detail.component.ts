import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HeroService } from 'src/app/hero.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
    public hero$;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: HeroService
    ) {}

    ngOnInit() {
        this.hero$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.service.getHero(params.get('id')))
        );
    }

    gotoHeroes(hero) {
        const heroId = hero ? hero.id : null;
        this.router.navigate(['/superheroes', { id: heroId, foo: 'foo'}]);
    }
}
