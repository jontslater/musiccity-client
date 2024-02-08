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
  const [allReactions, setAllReactions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const deleteThisPost = () => {
    console.warn('Deleting post with ID:', id);
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => {
        router.push('/');
      });
    }
  };

  useEffect(() => {
    getSinglePost(id, user.uid)
      .then((data) => setPostDetails(data))
      .catch((error) => console.error(error));

    getPostReactions(id)
      .then((reaction) => setReactions(reaction))
      .catch((error) => console.error(error));

    getAllReactions()
      .then((allReactionsData) => setAllReactions(allReactionsData))
      .catch((error) => console.error(error));
  }, [id, user.uid]);

  return (
    <>
      {postDetails.post_author?.id === user.id && (
        <div>
          <Button className="delete-button" variant="black" onClick={deleteThisPost}>
            Delete This Post
          </Button>
          <Button className="edit-button" variant="black" href={`/posts/edit/${postDetails.id}`}>
            Edit This Post
          </Button>
        </div>
      )}

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
          <span key={react.id}>{react.reaction_id?.label}</span>
        ))}
      </div>

      <div>
        <ul>
          {allReactions.map((reaction) => (
            <Button className="reaction-buttons" type="button" key={reaction.id}>{reaction.label}</Button>
          ))}
        </ul>
      </div>

      <div>{postDetails.post_content}</div>
      <div>Categories: {postDetails.categories?.label}</div>
    </>
  );
}
