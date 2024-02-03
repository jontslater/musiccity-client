import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../api/posts';

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

          <h1>{postDetails.post_author}</h1>
          <h1>{postDetails.post_post_title}</h1>
          {/* <img src="https://m.media-amazon.com/images/I/61yQAF86FKL._AC_SY450_.jpg" className="rounded float-start" alt="..." /> */}

          <h5>author here</h5>
          <h7 className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></h7>
        </div>
      </div>

      <div className="card">
        <button type="button">like</button>
        <button type="button">love</button>
        <button type="button">celebrate</button>
        <button type="button">dislike</button>
      </div>
      <h5>Post description here</h5>
      <p>tag1</p> <p>tag2</p>  <p>tag3</p>
    </>

  );
}
