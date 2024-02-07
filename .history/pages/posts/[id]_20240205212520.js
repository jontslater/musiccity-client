import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/posts';
import { getPostReactions, getSinglePostReaction } from '../../api/postReactions';
import { getAllReactions } from '../../api/reactions';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [reactions, setReactions] = useState([]);
  const [allReactions, setAllReactions] = useState([]);
  const router = useRouter();

  const { id } = router.query;
  const getAllTheReactions = () => {
    getAllReactions().then(setAllReactions);
    getPostReactions().then(setReactions);
  };

  useEffect(() => {
    getSinglePostReaction(id);
    getAllReactions();
    getSinglePost(id)
      .then((data) => setPostDetails(data));
  }, [id]);

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">

          <h1>{postDetails.post_title}</h1>
          <h2>{postDetails.post_author?.first_name} {postDetails.post_author?.last_name}</h2>
          <h2>Created on: {postDetails.created_on}</h2>
          <img src={postDetails.image_url} alt={postDetails.title} style={{ width: '300px' }} />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {allReactions.map((react) => (
          <button type="button" key={react.id}>
            <span>{react.label}</span>
          </button>
        ))}
      </div>

      <div>
        {postDetails.post_content}
      </div>
      <div>
        Categories: {postDetails.categories?.label}
      </div>
    </>

  );
}
