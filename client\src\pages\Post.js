import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Post({ match }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/api/posts/${match.params.id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    axios.get(`/api/comments/${match.params.id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [match.params.id]);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;