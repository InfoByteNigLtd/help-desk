import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() postComment: any;

  @Input() reactions: any = {likes: 1, commentNo: 20};
 @Input() commentId: any;

  constructor() { }


  ngOnInit() {}

}
