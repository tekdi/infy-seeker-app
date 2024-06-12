import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ConfirmService } from '../../core/services/confirm.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-course',
    standalone: true,
    imports: [FooterComponent, NavbarComponent, CommonModule],
    templateUrl: './course.component.html',
    styleUrl: './course.component.css',
})
export class CourseComponent {
    isLoading = false;
    courseDetails: any = {};
    providerId!: string;
    itemId!: string;
    userDetails!: any;
    courseUrl: any = null;
    // 'https://trial.vowel.work/Onestcontent/course-library/how-to-save-money';
    @ViewChild('courseIframe', { static: false })
    courseIframe!: ElementRef<HTMLIFrameElement>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private confirmService: ConfirmService,
        private sanitizer: DomSanitizer
    ) {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.providerId = params['provider_id'];
            this.itemId = params['item_id'];
        });

        let user = localStorage.getItem('userDetails');
        if (user) {
            this.userDetails = JSON.parse(user);
        }
    }

    ngOnInit() {
        this.fetchCourse();

        if (this.courseUrl) {
            this.courseUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                this.courseUrl
            );
        }
    }

    convertToEmbedUrl(url: string): string {
        let videoId: string;
        const youtubeRegex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);

        if (match && match[1]) {
            videoId = match[1];
            console.log(
                'Embed url: ',
                `https://www.youtube.com/embed/${videoId}`
            );
            return `https://www.youtube.com/embed/${videoId}`;
        } else {
            console.log('Url is not valid');
            return url;
        }
    }

    fetchCourse() {
        this.isLoading = true;
        this.confirmService
            .getCourseDetails(this.providerId, this.itemId, this.userDetails)
            .subscribe((data) => {
                console.log('data: ', data);
                this.courseDetails = data?.responses?.[0]?.message?.order;
                this.isLoading = false;

                console.log(this.courseDetails);

                if (
                    this.courseDetails?.fulfillments?.[0]?.stops?.[0]
                        ?.instructions?.media?.[0]?.url
                ) {
                    let url =
                        this.courseDetails?.fulfillments?.[0]?.stops?.[0]
                            ?.instructions?.media?.[0]?.url;

                    url = this.convertToEmbedUrl(url);

                    this.courseUrl =
                        this.sanitizer.bypassSecurityTrustResourceUrl(url);
                    return;
                }

                if (
                    this.courseDetails?.items[0]?.['add-ons']?.[0]?.descriptor
                        ?.media?.[0]?.url
                ) {
                    let url =
                        this.courseDetails?.items[0]?.['add-ons']?.[0]
                            ?.descriptor?.media?.[0]?.url;

                    url = this.convertToEmbedUrl(url);

                    this.courseUrl =
                        this.sanitizer.bypassSecurityTrustResourceUrl(url);
                    return;
                }
            });
    }
}
