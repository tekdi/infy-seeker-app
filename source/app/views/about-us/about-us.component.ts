import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [NavbarComponent, FooterComponent],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.css',
})
export class AboutUsComponent {}
