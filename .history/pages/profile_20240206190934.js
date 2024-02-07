import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPostReactions } from '../api/postReactions';
import { deletePost, getAllPost } from '../api/posts';
import PostCard from '../components/postCards';

export default function Profile() {
  const [postDetails, setPostDetails] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getAllThePosts = () => {
    getAllPost(user.uid)
      .then((data) => {
        setPostDetails(data);
        // Fetch reactions for each post
        data.forEach((post) => {
          getPostReactions(post.id)
            .then((reactions) => {
              // Assuming your post object has a property to store reactions
              post.reactions = reactions;
              setPostDetails([...postDetails]); // Trigger re-render after updating reactions
            })
            .catch((error) => console.error('Error fetching reactions:', error));
        });
      })
      .catch((error) => console.error('Error fetching posts:', error));
  };

  useEffect(() => {
    getAllThePosts();
  }, [user.uid]); // Fetch posts when the user ID changes

  return (
    <div>
      {postDetails.map((post) => (
        <PostCard key={post.firebaseKey} post={post} onUpdate={getAllThePosts} />
      ))}
    </div>
  );
}
