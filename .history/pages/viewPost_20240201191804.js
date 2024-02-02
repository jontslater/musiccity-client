// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
// import { useAuth } from '../utils/context/authContext';

// export default function viewPost() {
//   const [postDetails, setPostDetails] = useState({});
//   const router = useRouter();

//   useEffect(() => {
//     viewPostDetails(id).then(setPostDetails);
//   }, [id]);
import React from 'react';

export default function Profile() {
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <img src="https://m.media-amazon.com/images/I/61yQAF86FKL._AC_SY450_.jpg" className="rounded float-start" alt="..." />
          <h1>Post title here</h1>
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
    </>

  );
}
