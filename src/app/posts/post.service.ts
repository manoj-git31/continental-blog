import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostService {
    private posts: Post[] = [];
    private postsUpdated= new Subject<Post[]>();
    //private post: Post;

    constructor(private httpClient: HttpClient, private router: Router) {}

    getPosts() {
        this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((response:{message:string, posts:any}) => {
            return response.posts.map((post:any) => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                }
            });
        })).subscribe((transformedPosts) => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    addPost(title: string, content: string) {
        const post: Post = {
            id: "null",
            title: title,
            content: content
        }
        
        this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts',post)
        .subscribe((response) => {
            const id = response.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
        })
       
    }

    updatePost(id: string, title:string, content: string) {
        const post = {
            id: id,
            title: title,
            content: content
        };
        this.httpClient.put('http://localhost:3000/api/posts/'+id, post)
        .subscribe((response) =>{
           const updatedPosts = [...this.posts];
           const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
           updatedPosts[oldPostIndex] = post;
           this.posts = updatedPosts;
           this.postsUpdated.next([...this.posts]);
           this.router.navigate(["/"]);
        })
    }

    getPostsUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    deletePost(id: string) {
        this.httpClient.delete<{message: string}>('http://localhost:3000/api/posts/'+id).subscribe((response) => {
            const updatedPosts = this.posts.filter(post => post.id !== id);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPost(postId: string) {
        return this.httpClient.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/'+postId);
    }
}