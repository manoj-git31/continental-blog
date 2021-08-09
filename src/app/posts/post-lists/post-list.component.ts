import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

   isLoading=false;
   posts: Post[]= [];
   private postSub: Subscription = new Subscription();

    constructor(public postService:PostService) {}

    ngOnInit() {
        this.isLoading = true;
        this.postService.getPosts();
        this.postSub = this.postService.getPostsUpdateListener().subscribe( updatedPosts => {
            this.posts = updatedPosts;
            this.isLoading = false;
        })
    }

    ngOnDestroy() {
        this.postSub.unsubscribe();
    }

    onDelete(id: string) {
        this.postService.deletePost(id);
    }
}