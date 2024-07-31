import React, { useState } from "react";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="comments-section bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 soft-button-course-details"
        >
          Add Comment
        </button>
      </div>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="border-b py-2">
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
