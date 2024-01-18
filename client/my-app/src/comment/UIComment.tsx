import React, { useEffect, useState } from 'react';
import { Comment } from '../models/IComment';
import { getUserEmail } from '../services/UserService';
import '../css/CommentList.css';

interface UICommentProps {
  comment: Comment;
}

const UIComment: React.FC<UICommentProps> = ({ comment }) => {
  const [creatorEmail, setCreatorEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreatorEmail = async () => {
      try {
        if (comment.creatorUserId) {
          const userData = await getUserEmail(comment.creatorUserId);
          setCreatorEmail(userData.email);
        }
      } catch (error) {
        console.error('Error fetching creator email:', error);
      }
    };

    fetchCreatorEmail();
  }, [comment.creatorUserId]);

  return (
    <div className="ui-comment">
      <p className="ui-comment-description">{comment.description}</p>
      <p className="ui-comment-creator">Created by: {creatorEmail}</p>
      <p className="ui-comment-date">
        Creation Date: {new Date(comment.creationDate.seconds * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default UIComment;