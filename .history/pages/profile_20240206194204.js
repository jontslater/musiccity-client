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

  useEffect(() => {
    if (id) {
      const fetchReactions = async () => {
        try {
          const reaction = await getPostReactions(id);
          setReactions(reaction);
        } catch (error) {
          console.error('Error fetching reactions:', error);
        }
      };
      fetchReactions();
    }
  }, [id]);

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          postDetails.map((profile) => (
            <div className="card mb-3">
              <div className="card-body">
                <h1>{postDetails.post_title}</h1>
                <h2>{postDetails.post_author?.first_name} {postDetails.post_author?.last_name}</h2>
                <h2>Created on: {postDetails.created_on}</h2>
                <img src={postDetails.image_url} alt={postDetails.title} style={{ width: '300px' }} />
              </div>
            </div>
          ))
        )}
      </div>

      {id && (
        <div>
          <ul>
            {reactions.map((reaction) => (
              <li key={reaction.id}>
                <button type="button">{reaction.label}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
