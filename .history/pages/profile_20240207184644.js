/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getAllPost } from '../api/posts';

export default function Profile() {
  // const [profile, setProfile] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getAllThePosts = () => {
    getAllPost(user.uid).then(setPostDetails);
    console.warn(user);
  };

  useEffect(() => {
    getAllThePosts(id, user.uid);
  }, [id, user.uid]);

  return (
    <>
      <div><img src={user.fbUser.photoUrl} alt="user" width="100px" height="100px" className="user-display-photo" />{user.fbUser.displayName}{user.bio}{user.fbUser.photoURL}
      </div>
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

                  </>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
