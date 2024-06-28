import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environment/environment";
import { DataService } from "./data.service";

@Injectable({
    providedIn: "root",
})
export class ConfirmService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private dataService: DataService) {}

    getCourseDetails(
        providerId: string,
        itemId: string,
        data: any
    ): Observable<any> {
        let post: any = localStorage.getItem("post");
        if (post) {
            post = JSON.parse(post);
        }

        return this.http.post(`${this.apiUrl}/confirm`, {
            context: {
                domain: "onest:learning-experiences",
                action: "confirm",
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
                        descriptor: {
                            name: "kahani",
                            short_desc: "",
                            images: [],
                        },
                        categories: [
                            {
                                id: "Course",
                                descriptor: {
                                    code: "Course",
                                    name: "Course",
                                },
                            },
                        ],
                    },
                    items: [
                        {
                            id: itemId,
                            quantity: {
                                maximum: {
                                    count: 1,
                                },
                            },
                            parent_item_id: "",
                            descriptor: {
                                name: "",
                                short_desc: "",
                                long_desc: "",
                                images: [],
                                media: [],
                            },
                            creator: {
                                descriptor: {
                                    name: "",
                                },
                            },
                            price: {
                                currency: "INR",
                                value: "0",
                            },
                            category_ids: ["Course"],
                            rating: "NaN",
                            rateable: true,
                            tags: [
                                {
                                    display: true,
                                    descriptor: {
                                        name: "courseInfo",
                                        code: "courseInfo",
                                        list: [
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "sourceOrganisation",
                                                    name: "Source Organisation",
                                                },
                                                value: "sourceOrganisation",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "urlType",
                                                    name: "Url Type",
                                                },
                                                value: "Page",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "competency",
                                                    name: "Competency",
                                                },
                                                value: "competency",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "contentType",
                                                    name: "Content Type",
                                                },
                                                value: "Video",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "domain",
                                                    name: "Domain",
                                                },
                                                value: "Career advancement",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "curriculargoal",
                                                    name: "Curricular Goal",
                                                },
                                                value: "curriculargoal",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "language",
                                                    name: "Language",
                                                },
                                                value: "Hindi",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "themes",
                                                    name: "Themes",
                                                },
                                                value: "themes",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "minAge",
                                                    name: "minAge",
                                                },
                                                value: "10",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "maxAge",
                                                    name: "maxAge",
                                                },
                                                value: "null",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "author",
                                                    name: "author",
                                                },
                                                value: "Vowel",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "curricularGoals",
                                                    name: "curricularGoals",
                                                },
                                                value: "curricularGoals",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "learningOutcomes",
                                                    name: "learningOutcomes",
                                                },
                                                value: "learningOutcomes",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "persona",
                                                    name: "persona",
                                                },
                                                value: "Learner",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "license",
                                                    name: "license",
                                                },
                                                value: "Youtube",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "createdon",
                                                    name: "createdon",
                                                },
                                                value: "",
                                            },
                                            {
                                                display: true,
                                                descriptor: {
                                                    code: "lastupdatedon",
                                                    name: "lastupdatedon",
                                                },
                                                value: "",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                    // xinput: {
                    //     head: {
                    //         descriptor: {
                    //             name: 'Application Form',
                    //         },
                    //         index: {
                    //             min: 0,
                    //             cur: 1,
                    //             max: 1,
                    //         },
                    //     },
                    //     form: {
                    //         url:
                    //             'https://onest-bap.tekdinext.com/application/334/' +
                    //             this.dataService.getTransactionId(),
                    //         mime_type: 'text/html',
                    //         resubmit: false,
                    //         submission_id: this.dataService.getUuid(),
                    //     },
                    //     required: true,
                    // },
                    fulfillments: [
                        {
                            customer: {
                                person: {
                                    name: data?.name,
                                    age: String(data?.age),
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
                                    phone: String(data?.phone),
                                    email: data?.email,
                                },
                            },
                        },
                    ],
                    type: "DEFAULT",
                },
            },
        });
    }
}
