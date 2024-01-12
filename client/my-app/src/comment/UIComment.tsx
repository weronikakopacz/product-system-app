import React from 'react';
import { Comment } from '../models/IComment'
import '../css/CommentList.css'

const UIComment: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className="ui-comment">
      <p className="ui-comment-description">{comment.description}</p>
      <p className="ui-comment-creator">Created by: {comment.creatorUserId}</p>
      <p className="ui-comment-date">
        Creation Date: {new Date(comment.creationDate.seconds * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default UIComment;
