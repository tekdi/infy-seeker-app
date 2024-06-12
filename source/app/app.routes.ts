import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { ContentDetailComponent } from './views/content-detail/content-detail.components';
import { EnrollFormComponent } from './views/enroll-form/enroll-form.component';
import { CourseComponent } from './views/course/course.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'details', component: ContentDetailComponent },
    { path: 'enroll', component: EnrollFormComponent },
    { path: 'course', component: CourseComponent },
];
