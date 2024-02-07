import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSinglePost, deletePost } from '../../api/posts';
import { getAllReactions } from '../../api/reactions';
import { getPostReactions } from '../../api/postReactions';
import { useAuth } from '../../utils/context/authContext';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [reactions, setReactions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;
  const getAllTheReactions = () => {
    getAllReactions().then(setReactions);
  };

  const deleteThisPost = () => {
    console.warn('Deleting post with ID:', id);
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => {
        router.push('/');
      });
    }
  };

  useEffect(() => {
    getAllTheReactions();
    getSinglePost(id, user.uid)
      .then((data) => setPostDetails(data));
    getPostReactions(id)
      .then((reaction) => setReactions(reaction));
  }, [id]);

  return (
    <>
      <div>{(postDetails.post_author?.id === user.id) ? (<Button className="delete-button" variant="black" onClick={deleteThisPost}>Delete This Post</Button>) : ''}</div>
      <div>{(postDetails.post_author?.id === user.id) ? (<Button className="edit-button" variant="black" href={`/posts/edit/${postDetails.id}`}>Edit This Post</Button>) : ''}</div>
      <div className="card mb-3">
        <div className="card-body">

          <h1>{postDetails.post_title}</h1>
          <h2>{postDetails.post_author?.first_name} {postDetails.post_author?.last_name}</h2>
          <h2>Created on: {postDetails.created_on}</h2>
          <img src={postDetails.image_url} alt={postDetails.title} style={{ width: '300px' }} />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {reactions.map((react) => (
          <button type="button" key={react.id}>
            <span>{react.reaction_id?.label}</span>
            {reactions.label}

          </button>
        ))}
      </div>

      <div>
        {postDetails.post_content}
      </div>
      <div>
        Categories: {postDetails.categories?.label}
      </div>
    </>

  );
}
