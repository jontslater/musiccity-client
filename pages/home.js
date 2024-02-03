/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPosts } from '../api/postData';
import { useAuth } from '../utils/context/authContext';
// import PostCard from '../components/postCards';

function Home() {
  // TODO: Set a state for books
  const [Posts, setPosts, PostCard] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllThePosts = () => {
    getPosts(user.uid).then(setPosts);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/post/new" passHref>
        <Button>Add A post</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {Posts.map((post) => (
          <PostCard key={post.firebaseKey} postObj={post} onUpdate={getAllThePosts} />
        ))}
      </div>

    </div>
  );
}

export default Home;
