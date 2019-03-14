import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CrisisService } from '../crisis.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
import { DialogService } from '../../dialog.service';
import { CanDeactivate } from '@angular/router';
import { Crisis } from '../mock-crisis';

@Component({
    templateUrl: './crisis-detail.component.html'
})
export class CrisisDetailComponent implements OnInit {
    public crisis;
    public editName;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: CrisisService,
        public dialogService: DialogService
    ) {}

    ngOnInit() {
        this.route.data
          .subscribe((data: { crisis: Crisis }) => {
            this.editName = data.crisis.name;
            this.crisis = data.crisis;
          });
      }

    gotoCrises() {
        const crisisId = this.crisis ? this.crisis.id : null;
        this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
    }

    cancel() {
        this.gotoCrises();
    }

    save() {
        this.crisis.name = this.editName;
        this.gotoCrises();
    }

    canDeactivate(): Observable<boolean> | boolean {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (!this.crisis || this.crisis.name === this.editName) {
          return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // observable which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
      }
}
