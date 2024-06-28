import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environment/environment";
import { DataService } from "./data.service";

@Injectable({
    providedIn: "root",
})
export class SelectService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private dataService: DataService) {}

    getPostDetails(providerId: string, itemId: string): Observable<any> {
        let post: any = localStorage.getItem("post");
        if (post) {
            post = JSON.parse(post);
        }

        return this.http.post(`${this.apiUrl}/select`, {
            context: {
                domain: "onest:learning-experiences",
                action: "select",
                version: "1.1.0",
                bap_id: post?.bap_id || "lexp-bap.tekdinext.com",
                bap_uri: post?.bap_uri || "https://lexp-bap.tekdinext.com/",
                bpp_id: post?.bpp_id || "lexp-bpp.tekdinext.com",
                bpp_uri: post?.bpp_uri || "https://lexp-bpp.tekdinext.com/",
                transaction_id: this.dataService.getNewTransactionId(),
                message_id: this.dataService.getUuid(),
                timestamp: this.dataService.getTimestamp(),
            },
            message: {
                order: {
                    provider: {
                        id: providerId,
                    },
                    items: [
                        {
                            id: itemId,
                        },
                    ],
                },
            },
        });
    }
}
