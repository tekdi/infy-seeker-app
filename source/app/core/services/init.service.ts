import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environment/environment";
import { DataService } from "./data.service";

type SelectApiResponse = {
    context: {
        transaction_id: string;
        message_id: string;
        timestamp: string;
    };
    responses: any[];
};

@Injectable({
    providedIn: "root",
})
export class InitService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private dataService: DataService) {}

    submitDetails(
        providerId: string,
        itemId: string,
        data: any
    ): Observable<any> {
        let post: any = localStorage.getItem("post");
        if (post) {
            post = JSON.parse(post);
        }

        return this.http.post(`${this.apiUrl}/init`, {
            context: {
                domain: "onest:learning-experiences",
                action: "init",
                version: "1.1.0",
                bap_id: post?.bap_id || "lexp-bap.tekdinext.com",
                bap_uri: post?.bap_uri || "https://lexp-bap.tekdinext.com/",
                bpp_id: post?.bpp_id || "lexp-bpp.tekdinext.com",
                bpp_uri: post?.bpp_uri || "https://lexp-bpp.tekdinext.com/",
                transaction_id: this.dataService.getTransactionId(),
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
                    fulfillments: [
                        {
                            customer: {
                                person: {
                                    name: data.name,
                                    age: String(data.age),
                                    tags: [
                                        {
                                            code: "distributor-details",
                                            list: [
                                                {
                                                    descriptor: {
                                                        code: "distributor-name",
                                                        name: "Distributor Name",
                                                    },
                                                    value: "",
                                                },
                                                {
                                                    descriptor: {
                                                        code: "agent-id",
                                                        name: "Agent Id",
                                                    },
                                                    value: "",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                contact: {
                                    phone: String(data.phone),
                                    email: data.email,
                                },
                            },
                        },
                    ],
                },
            },
        });
    }
}

export class SelectService {}
