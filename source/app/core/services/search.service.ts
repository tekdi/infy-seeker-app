import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getPosts(searchQuery?: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/content/search`, {
            title: searchQuery,
        });
    }
}
