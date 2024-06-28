import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    imports: [RouterModule, CommonModule],
    standalone: true,
    styleUrl: './footer.component.css',
})
export class FooterComponent {}
