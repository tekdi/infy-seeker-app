import {
    Component,
    ChangeDetectorRef,
    PLATFORM_ID,
    Inject,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

import { ClipTextPipe } from "../../shared/pipes/clip-text.pipe";
import { RemoveHtmlPipe } from "../../shared/pipes/remove-html.pipe";

import { FooterComponent } from "../../shared/components/footer/footer.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

import { SearchService } from "../../core/services/search.service";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [
        NavbarComponent,
        FooterComponent,
        CommonModule,
        ClipTextPipe,
        RemoveHtmlPipe,
        FormsModule,
        MatIconModule,
        RouterModule,
    ],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent {
    posts: any = [];
    searchQuery: string = "";
    searchQueryDelayed: any;
    isLoading: boolean = false;
    isSearched: boolean = false;

    paginatedPosts: any[] = [];
    currentPage: number = 1;
    totalPages: number = 1;
    postsPerPage: number = 6;

    recognition: any;
    isMicrophoneActive: boolean = false;
    waitingForConfirmation: boolean = false;
    selectedLanguage = "en-US"; // Default to English

    constructor(
        private searchService: SearchService,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.initSpeechRecognition();
        }
    }

    ngOnInit() {
        this.fetchPosts();
    }

    // Fetch posts from the API with optional search query
    fetchPosts(searchQuery?: string) {
        this.isLoading = true;
        this.searchService.getPosts(searchQuery).subscribe((data) => {
            this.posts = data?.data?.kahani_cache;
            this.isLoading = false;
            this.updatePagination();
        });
    }

    // Update pagination details
    updatePagination() {
        this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        this.paginatePosts();
    }

    // Slice posts array to get posts for the current page
    paginatePosts() {
        const startIndex = (this.currentPage - 1) * Number(this.postsPerPage);
        const endIndex = startIndex + Number(this.postsPerPage);
        this.paginatedPosts = this.posts.slice(startIndex, endIndex);
    }

    // Move to the next page of posts
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.paginatePosts();
        }
    }

    // Move to the previous page of posts
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.paginatePosts();
        }
    }

    // Handle search button click or Enter key press
    handlerSearch() {
        this.isSearched = true;
        if (this.searchQuery) {
            this.isLoading = true;
            this.fetchPosts(this.searchQuery);

            this.searchQueryDelayed = this.searchQuery;

            this.cdr.detectChanges();

            this.toSearchResult();
        }
    }

    // Clear search and reset posts
    handlerClear() {
        this.isSearched = false;
        this.searchQuery = "";
        this.fetchPosts();
    }

    // Handle changes to the search query input
    handleQueryChange() {
        if (!this.searchQuery) {
            this.handlerClear();
        }
    }

    // Handle Enter key press event for the search input
    handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.handlerSearch();
        }
    }

    // Scroll to the search result section smoothly
    toSearchResult() {
        const searchResultElement = document.getElementById("search-result");
        if (searchResultElement) {
            searchResultElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
        }
    }

    initSpeechRecognition() {
        if (typeof window !== "undefined") {
            const SpeechRecognition =
                (window as any).SpeechRecognition ||
                (window as any).webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = this.selectedLanguage;

            this.recognition.onresult = (event: any) => {
                let transcript = event.results[0][0].transcript;
                // remove trailing "." from transcript by removing last
                // character
                // transcript = transcript.slice(0, -1);
                this.searchQuery = transcript;
                this.handlerSearch();
                this.toggleMicrophone();
            };

            this.recognition.onerror = (event: any) => {
                console.error("Voice recognition error:", event.error);
            };
        }
    }

    onLanguageChange(event: any) {
        this.selectedLanguage = event.target.value;
        if (this.recognition) {
            this.recognition.lang = this.selectedLanguage;
            console.log(`Language changed to ${this.selectedLanguage}`);
        }
    }

    startVoiceRecognition() {
        if (isPlatformBrowser(this.platformId)) {
            console.log("Starting voice recognition...");
            this.recognition.start();
        }
    }

    activateMicrophone() {
        this.isMicrophoneActive = true;
        console.log("Microphone activated");
    }

    deactivateMicrophone() {
        this.isMicrophoneActive = false;
        this.handlerSearch();
        console.log("Microphone deactivated");
    }

    toggleMicrophone() {
        if (this.isMicrophoneActive) {
            console.log("Deactivating microphone...");
            this.deactivateMicrophone();
        } else {
            console.log("Activating microphone...");
            this.activateMicrophone();
            this.startVoiceRecognition();
        }
    }

    checkMicrophonePermissions() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    console.log("Microphone access granted.");
                    stream.getTracks().forEach((track) => track.stop());

                    alert(
                        "Microphone access is required for speech recognition."
                    );

                    // window.localStream = stream; // A
                    // window.localAudio.srcObject = stream; // B
                    // window.localAudio.autoplay = true; // C
                })
                .catch((error) => {
                    console.error("Microphone access denied:", error);
                    alert(
                        "Microphone access is required for speech recognition."
                    );
                });
        } else {
            console.warn("getUserMedia not supported on this browser.");
            alert("Your browser does not support microphone access.");
        }
    }

    navigateToDetails(post: any) {
        if (!post) return;

        let postString: string = JSON.stringify(post);
        localStorage.setItem("post", postString);

        this.router.navigate(["/details"], {
            queryParams: {
                provider_id: post.provider_id,
                item_id: post.item_id,
            },
        });
    }
}
