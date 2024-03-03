import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment } from 'src/app/Models/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Output()
  closeForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  emitCommentData: EventEmitter<Comment> = new EventEmitter<Comment>();

  OnCloseForm() {
    this.closeForm.emit(false);
  }

  onCommentSubmited(form: NgForm) {
    this.emitCommentData.emit(form.value);
    this.closeForm.emit(false);
  }
}
