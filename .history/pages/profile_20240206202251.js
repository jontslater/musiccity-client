import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPostReactions } from '../api/postReactions';
import { getAllPost } from '../api/posts';

export default function Profile() {
  // const [profile, setProfile] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [reactions, setReactions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getAllThePosts = () => {
    getAllPost(user.uid).then(setPostDetails);
  };

  useEffect(() => {
    getAllThePosts(id, user.uid);

    getPostReactions(id)
      .then((reaction) => setReactions(reaction))
      .catch((error) => console.error(error));
  }, [id, user.uid]);

  return (
    <div>
      {postDetails
        .filter((post) => post.post_author?.id === user.id)
        .map((post) => (
          <div key={post.id} className="card mb-3">
            <div className="card-body">
              <>
                <Link href={`/posts/${postObj.id}`} passHref>
                  <Button variant="primary" className="m-2">
                    VIEW
                  </Button>
                </Link>
                <h1>{post.post_title}</h1>
                <h2>{post.post_author?.first_name} {post.post_author?.last_name}</h2>
                <h2>Created on: {post.created_on}</h2>
                <img src={post.image_url} alt={post.title} style={{ width: '300px' }} />
                {reactions
                  .filter((reaction) => reaction.post_id === post.id)
                  .map((react) => (
                    <span key={react.id}>{react.label}</span>
                  ))}
              </>
            </div>
          </div>
        ))}
    </div>
  );
}
