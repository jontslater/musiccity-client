import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPostReactions } from '../api/postReactions';
import { getAllPost } from '../api/posts';
import PostCard from '../components/postCards';

export default function Profile() {
  const [postDetails, setPostDetails] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getAllThePosts = async () => {
    setLoading(true);
    try {
      const posts = await getAllPost(user.uid);
      setPostDetails(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllThePosts();
  }, [user.uid]);
  const userPosts = postDetails.filter((post) => post.userId === user.uid);

  return (
    <>
      <div>

        <PostCard key={profile.id} onUpdate={getAllThePosts} />

      </div>
    </>
  );
}
