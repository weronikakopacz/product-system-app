import React, { useEffect, useState } from 'react';
import { fetchComments } from '../services/CommentService';
import UIComment from './UIComment';
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';
import { Comment } from '../models/IComment';
import { checkUserUid } from '../user/CheckUserUid';

interface CommentListProps {
  productId: string;
}

const CommentList: React.FC<CommentListProps> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [userUid, setUserUid] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchComments(productId);
        setComments(result.comments);
        const uid = await checkUserUid();
        setUserUid(uid);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      }
    };

    fetchData();
  }, [productId, editingCommentId]);

  const handleEdit = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  const handleEditDone = () => {
    setEditingCommentId(null);
  };

  const handleDelete = async () => {
    try {
      window.location.reload();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <UIComment comment={comment} />
              <div>
                {userUid === comment.creatorUserId && (
                  <>
                    <button className="button" onClick={() => handleEdit(comment.id)}>
                      Edit
                    </button>
                  </>
                )}
                <DeleteComment commentId={comment.id} onCommentDeleted={() => handleDelete()} />
              </div>
              {editingCommentId === comment.id && (
                <EditComment commentId={comment.id} initialData={comment} onEditDone={handleEditDone} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
}

export default CommentList;