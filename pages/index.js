/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getAllPost } from '../api/posts';
import PostCard from '../components/postCards';

function Home() {
  const [posts, setPosts] = useState([]); // Remove PostCard from here
  const { user } = useAuth();

  const getPosts = () => {
    getAllPost(user.uid).then(setPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/post/new" passHref>
        <Button>Add A Post</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getPosts} />
        ))}
      </div>
    </div>
  );
}

export default Home;
