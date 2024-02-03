/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  const [posts, setPosts, PostCard] = useState([]);
  //   const { user } = useAuth();

  const getPosts = async () => {
    // Replace 'getMembers' with the correct function to fetch posts
    const response = await fetch('/api/posts'); // Replace with your API endpoint
    const data = await response.json();
    setPosts(data);
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

// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

// // this will be the home page

// function Home() {
//   const { user } = useAuth();
//   return (
//     <div
//       className="text-center d-flex flex-column justify-content-center align-content-center"
//       style={{
//         height: '90vh',
//         padding: '30px',
//         maxWidth: '400px',
//         margin: '0 auto',
//       }}
//     >
//       <h1>Hello {user.fbUser.displayName}! </h1>
//       <p>Your Bio: {user.bio}</p>
//       <p>Click the button below to logout!</p>
//       <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
//         Sign Out
//       </Button>
//     </div>
//   );
// }

// export default Home;
