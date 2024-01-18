import axios from 'axios';
import { Comment } from '../models/IComment';

const API_BASE_URL = 'http://localhost:8080/api/comments';

export const fetchComments = async (productId: string): Promise<{ comments: Comment[] }> => {
  try {
    const url = `${API_BASE_URL}/getDisplayComments/${productId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  };
};

export const editComment = async (editedData: Comment): Promise<void> => {
  const { id, ...dataWithoutId } = editedData;
  try {
    await axios.put(`${API_BASE_URL}/edit/${id}`, dataWithoutId);
  } catch (error) {
    console.error('Error editing comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId: string, accessToken: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const addComment = async (productId: string, newCommentData: any): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/add/${productId}`, newCommentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};