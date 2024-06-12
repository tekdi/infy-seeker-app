import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    // isSearchVisible: boolean = false;

    @Input() hero!: boolean;
    @Input() courseUrl!: any;
    isScrolled: boolean = false;

    constructor(private location: Location, private router: Router) {}

    @HostListener('window:scroll', [])
    onWindowScroll() {
        // If the navbar is in hero mode, don't change the background color
        // this.isScrolled = window.pageYOffset >= window.innerHeight;
        this.isScrolled = window.pageYOffset >= 100;

        console.log(window.pageYOffset, window.innerHeight, this.isScrolled);

        // Detect if the user has scrolled down 100vh
    }

    goBack(): void {
        if (window.history.length > 1) {
            this.location.back();
        } else {
            this.router.navigate(['/']);
        }
    }

    //   toggleSearch() {
    //     this.isSearchVisible = !this.isSearchVisible;
    //   }

    openUrlInNewTab(url: any) {
        let a = document.createElement('a');
        a.href = url?.changingThisBreaksApplicationSecurity;
        a.target = '_blank';
        a.click();
    }
}
