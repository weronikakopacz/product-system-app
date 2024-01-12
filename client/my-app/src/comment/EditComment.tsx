import React, { useState, ChangeEvent } from 'react';
import { Comment } from '../models/IComment';
import { editComment } from '../services/CommentService';
import '../css/EditComment.css'

interface EditCommentProps {
  commentId: string;
  initialData: Comment;
  onEditDone: () => void;
}

const EditComment: React.FC<EditCommentProps> = ({ initialData, onEditDone }) => {
  const [editedData, setEditedData] = useState<Comment>(initialData);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (!editedData.description.trim()) {
      setError('Description cannot be empty');
      return false;
    }
    setError(null);
    return true;
  };

  const handleEdit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await editComment(editedData);
      onEditDone();
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleCancel = () => {
    onEditDone();
  };

  return (
    <div className="edit-comment">
      <h2>Edit Comment</h2>
      <label>
        Description:
        <input type="text" name="description" value={editedData.description} onChange={handleChange} />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditComment;