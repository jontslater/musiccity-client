import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getPostReactions } from '../api/postReactions';
import { getAllPost } from '../api/posts';
import getAllUsers from '../api/user';

export default function Profile() {
  // const [profile, setProfile] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [reactions, setReactions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getAllThePosts = () => {
    getAllPost(user.uid).then(setPostDetails);
    // getAllUsers(user.uid).then(setProfile);
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
        .filter((post) => post.post_author && post.post_author.id === user.id)
        .map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} passHref>
            <div className="card mb-3">
              <div className="card-body">
                <>
                  <Button variant="primary" className="m-2">
                    VIEW
                  </Button>
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
          </Link>
        ))}
    </div>
  );
}
