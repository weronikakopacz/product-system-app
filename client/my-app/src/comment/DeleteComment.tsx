import React, { useEffect, useState } from 'react';
import { deleteComment } from '../services/CommentService';
import { getAccessToken } from '../services/AuthService';
import { checkUserRole } from '../user/CheckUserRole';

interface DeleteCommentProps {
  commentId: string;
  onCommentDeleted: () => void;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ commentId, onCommentDeleted }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await checkUserRole();
      setUserRole(role);
    };

    fetchUserRole();
  }, []);

  const handleDelete = async () => {
    try {
      const accessToken = getAccessToken();

      if (userRole !== 'user' && accessToken) {
        await deleteComment(commentId, accessToken);
        onCommentDeleted();
      } else {
        console.error('User does not have admin privileges or accessToken is null.');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (userRole === null) {
    // Warunkowe renderowanie
    return null;
  }

  return userRole !== 'user' ? (
    <button className="button" onClick={handleDelete}>
      Delete Comment
    </button>
  ) : null;
};

export default DeleteComment;