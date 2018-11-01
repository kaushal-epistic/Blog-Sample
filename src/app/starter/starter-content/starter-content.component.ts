import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { Posts } from '../model/Posts';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-starter-content',
  templateUrl: './starter-content.component.html',
  styleUrls: ['./starter-content.component.css']
})
export class StarterContentComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
 
  IsShowConfirm:boolean=false;
  IsSuccessOpenDialog:boolean=false;
  IsShowAddPopup:boolean=false;
  GlobalDeleteID:number;
  posts:Posts[]=[];
  dtTrigger: Subject<Posts> = new Subject();
  objPost:Posts;
  IsAdd:boolean=true;

  
  constructor() {
    
    
   }
  
  ngOnInit() {
    // Update the AdminLTE layouts
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.GetPostsDetails();
    AdminLTE.init();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  GetPostsDetails(){
    // fetch('assets//Posts.json')
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      this.posts= json;  
      this.dtTrigger.next();
    })
  }

  showEdit(p){
    this.IsAdd=false;
    this.objPost = p;
    this.IsShowAddPopup=true;
  }
  showAddPopup()
  {
    this.IsAdd=true;
    this.objPost = new Posts();
    this.IsShowAddPopup=true;
  }
  closeShowAdd()
  {
    this.IsShowAddPopup=false;
  }

  UpdatePost(){
    fetch('https://jsonplaceholder.typicode.com/posts/' + this.objPost.id, {
    method: 'PUT',
    body: JSON.stringify({
      id: this.objPost.id,
      title: this.objPost.title,
      body: this.objPost.body,
      userId: this.objPost.userId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    this.closeShowAdd()    
  })
  }
  SavePost()
  {
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: this.objPost.title,
      body: this.objPost.body,
      userId:this.objPost.userId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }    
  })
  .then(response => response.json())
  .then(json => {
    this.closeShowAdd()    
  })
  }
  IsShowConfirBox(id){      
    this.IsShowConfirm = true;
    this.GlobalDeleteID = id;
  }
  closeConfirmbox()
  {
    this.IsShowConfirm = false;
    this.IsSuccessOpenDialog = false;
  }
  
  DeleteSelectedPost(id){
    fetch('https://jsonplaceholder.typicode.com/posts/' + this.GlobalDeleteID, {
      method: 'DELETE'
    })
    this.IsShowConfirm = false;
    this.IsSuccessOpenDialog = true;
   
  }

}
