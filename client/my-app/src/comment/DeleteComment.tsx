import React, { useEffect, useState } from 'react';
import { deleteComment } from '../services/CommentService';
import { getAccessToken } from '../services/AuthService';
import { getUserProfile } from '../services/UserService';

interface DeleteCommentProps {
  commentId: string;
  onCommentDeleted: () => void;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ commentId, onCommentDeleted }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const accessToken = getAccessToken();

        if (accessToken) {
          const response = await getUserProfile(accessToken);

          setUserRole(response.role);
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setUserRole('user');
      }
    };

    checkUserRole();
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
    // warunkowe renderowanie
    return null;
  }

  return userRole !== 'user' ? (
    <button className="button" onClick={handleDelete}>
      Delete Comment
    </button>
  ) : null;
};

export default DeleteComment;