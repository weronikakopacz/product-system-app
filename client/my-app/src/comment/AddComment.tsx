import React, { useState } from 'react';
import { addComment } from '../services/CommentService';
import '../css/AddComment.css'

interface AddCommentProps {
  productId: string;
  onCommentAdded: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ productId, onCommentAdded }) => {
  const [description, setDescription] = useState<string>('');

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      if (description.trim() === '') {
        console.error('Description is required.');
        return;
      }

      await addComment(productId, { description }); 
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
      <button className="add-comment-button" onClick={handleAddComment}>
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;