import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPostReactions } from '../api/postReactions';
import { deletePost, getAllPost } from '../api/posts';
import PostCard from '../components/postCards';

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
    getAllThePosts(id, user.uid)
      .then((data) => setPostDetails(data))
      .catch((error) => console.error(error));

    // getPostReactions(id)
    //   .then((reaction) => setReactions(reaction))
    //   .catch((error) => console.error(error));
  }, [id, user.uid]);

  return (
    <div>
      {postDetails.map((book) => (
        <PostCard key={book.firebaseKey} bookObj={book} onUpdate={getAllThePosts} />

      ))}
    </div>
  );
}
