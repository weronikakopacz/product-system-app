import React from 'react';
import { deleteComment } from '../services/CommentService';

interface DeleteCommentProps {
  commentId: string;
  onCommentDeleted: () => void;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ commentId, onCommentDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteComment(commentId);
      onCommentDeleted();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <button className="button" onClick={handleDelete}>Delete Comment</button>
  );
};

export default DeleteComment;