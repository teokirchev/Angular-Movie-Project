import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment } from 'src/app/Models/Comment';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent {
  @Output()
  closeEditForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  emitEditedCommentData: EventEmitter<Comment> = new EventEmitter<Comment>();

  @Input()
  editedCommentData: Comment

  OnCloseForm() {
    this.closeEditForm.emit(false);
  }

  onCommentSubmited(form: NgForm) {
    const editedComment: Comment = { ...this.editedCommentData, comment: form.value.comment };
    this.emitEditedCommentData.emit(editedComment);
    this.closeEditForm.emit(false);
  }
}
