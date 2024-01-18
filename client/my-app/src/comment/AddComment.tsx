import React, { useState, useEffect } from 'react';
import { addComment } from '../services/CommentService';
import { getAccessToken } from '../services/AuthService';
import { getUserId } from '../services/UserService';
import '../css/AddComment.css';

interface AddCommentProps {
  productId: string;
  onCommentAdded: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ productId, onCommentAdded }) => {
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setError('User not logged in. Please log in to add a comment.');
      }
    };

    checkAccessToken();
  }, []);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      if (description.trim() === '') {
        setError('Description is required.');
        return;
      }

      const accessToken = getAccessToken();
      if (!accessToken) {
        setError('User not logged in. Please log in to add a comment.');
        return;
      }

      const currentUser = await getUserId(accessToken);
      const commentData = {
        description,
        creatorUserId: currentUser,
      };

      await addComment(productId, commentData);
      onCommentAdded();
      setDescription('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="add-comment-container">
      <h2 className="add-comment-heading">Add Comment</h2>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="description-input"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="add-comment-button" onClick={handleAddComment}>
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;