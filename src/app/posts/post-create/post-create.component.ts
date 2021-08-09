import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { PostService } from "../post.service";


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    
    private mode = 'create';
    private postId: string = "";
    existingPost: any;
    isLoading = false;
    form: FormGroup = new FormGroup({});
    @Output() postCreated = new EventEmitter<Post>();

    constructor(public postService:PostService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.form =  new FormGroup({
            title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            content: new FormControl(null, {validators: [Validators.required]}),
            image: new FormControl(null, {validators: [Validators.required]})
        });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if(paramMap.has('postId')) {
                this.mode='edit';
                const tempPostId = paramMap.get('postId');
                if( null !== tempPostId) {
                    this.postId =  tempPostId;
                    this.isLoading = true;
                    this.existingPost = this.postService.getPost(this.postId).subscribe(postData => {
                        this.existingPost = {id:postData._id, title: postData.title, content: postData.content};
                        this.isLoading = false;
                        this.form.setValue({
                            title: postData.title, 
                            content: postData.content
                        });
                    });
                }
                
            } else {
                this.mode='create';
                this.postId ="null";
            }
        });
    }

    onSavePost() {
        // if(this.form.invalid) {
        //    return;
        // }
        this.isLoading = true;
        if(this.mode === 'create') {
            console.log('Adding new post');
            console.log(this.form.value.title);
            console.log(this.form.value.content);
            this.postService.addPost(this.form.value.title, this.form.value.content);
        } else {
            console.log('Updating post');
            this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content );
        }
        this.form.reset();
        
    }

    onImagePicked(event: Event) {
        
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image: file});
        this.form.get('image')?.updateValueAndValidity();
        console.log(file);
        console.log(this.form);
        
    }
}