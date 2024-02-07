import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [postDetails, setPostDetails] = useState({});
  const [reactions, setReactions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id, user.uid)
      .then((data) => setPostDetails(data))
      .catch((error) => console.error(error));

    getPostReactions(id)
      .then((reaction) => setReactions(reaction))
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
    </>
  );
}
