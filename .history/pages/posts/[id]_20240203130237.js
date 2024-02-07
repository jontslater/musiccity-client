import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/posts';
import { getPostReactions } from '../../api/postReactions';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [reactions, setReactions] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
  }, [id]);

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">

          <h1>{postDetails.post_title}</h1>
          <h5>{postDetails.post_author.first_name} {postDetails.post_author.last_name}</h5>
          <h8>Created on: {postDetails.created_on}</h8>
          <img src={postDetails.image_url} alt={postDetails.title} style={{ width: '300px' }} />
        </div>
      </div>
      {postDetails.post_content}

      <div className="card">
        <button type="button">like</button>
        <button type="button">love</button>
        <button type="button">celebrate</button>
        <button type="button">dislike</button>
      </div>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {reactions.map((reaction) => (
          <BookCard key={reaction.id} reactionObj={reaction} onUpdate={getPostReactions} />
        ))}
      </div>
    </>

  );
}
