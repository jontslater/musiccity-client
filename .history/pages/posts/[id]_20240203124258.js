import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/posts';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
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

          <h7 className="card-text"><small className="text-body-secondary">{postDetails.created_on}</small></h7>
          {postDetails.post_content}

        </div>
      </div>

      <div className="card">
        <button type="button">like</button>
        <button type="button">love</button>
        <button type="button">celebrate</button>
        <button type="button">dislike</button>
      </div>
    </>

  );
}
