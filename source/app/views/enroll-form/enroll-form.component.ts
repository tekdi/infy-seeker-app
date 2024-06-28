import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { InitService } from '../../core/services/init.service';

@Component({
    selector: 'app-enroll-form',
    standalone: true,
    imports: [
        FooterComponent,
        NavbarComponent,
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './enroll-form.component.html',
    styleUrl: './enroll-form.component.css',
})
export class EnrollFormComponent {
    isLoading: boolean = false;
    enrollForm!: FormGroup;
    providerId!: string;
    itemId!: string;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private initService: InitService
    ) {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.providerId = params['provider_id'];
            this.itemId = params['item_id'];
        });
    }

    ngOnInit() {
        this.enrollForm = this.fb.group({
            name: ['', Validators.required],
            age: ['', [Validators.required, Validators.min(1)]],
            email: ['', [Validators.required, Validators.email]],
            phone: [
                '',
                [
                    Validators.required,
                    Validators.min(1000000000),
                    Validators.max(9999999999),
                ],
            ],
        });
    }
    onSubmit() {
        this.isLoading = true;
        this.submitted = true;

        console.log(this.enrollForm);

        if (!this.enrollForm.valid) {
            this.isLoading = false;

            return;
        }

        this.initService
            .submitDetails(this.providerId, this.itemId, this.enrollForm.value)
            .subscribe((data) => {
                this.isLoading = false;

                // save form data in local storage
                localStorage.setItem(
                    'userDetails',
                    JSON.stringify(this.enrollForm.value)
                );

                this.router.navigate(['/course'], {
                    queryParams: {
                        provider_id: this.providerId,
                        item_id: this.itemId,
                    },
                });
            });
    }
}
