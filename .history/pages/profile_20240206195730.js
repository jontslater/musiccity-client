import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
// import { getPostReactions } from '../api/postReactions';
import { getAllPost } from '../api/posts';

export default function Profile() {
  // const [profile, setProfile] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  // const [reactions, setReactions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getAllThePosts = () => {
    getAllPost(user.uid).then(setPostDetails);
  };

  // const deleteThisPost = () => {
  //   console.warn('Deleting post with ID:', id);
  //   if (window.confirm('Delete Post?')) {
  //     deletePost(id).then(() => {
  //       router.push('/');
  //     });
  //   }
  // };

  useEffect(() => {
    getAllThePosts(id, user.uid);

    // getPostReactions(id)
    //   .then((reaction) => setReactions(reaction))
    //   .catch((error) => console.error(error));
  }, [id, user.uid]);

  return (
    <div>
      {postDetails.post_author?.id === user.id && (
      {postDetails.map((userID) => (
        <div key={userID.id} className="card mb-3">
          <div className="card-body">
            <h1>{postDetails.post_title}</h1>
            <h2>{postDetails.post_author?.first_name} {postDetails.post_author?.last_name}</h2>
            <h2>Created on: {postDetails.created_on}</h2>
            <img src={postDetails.image_url} alt={postDetails.title} style={{ width: '300px' }} />
          </div>
        </div>

      ))}
      )
}
    </div>
  );
}
