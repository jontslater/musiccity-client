import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function viewPost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();

  useEffect(() => {
    viewPostDetails(id).then(setPostDetails);
  }, [id]);

  return (
    <>
      <div className="card mb-3">
        <img src={postDetails.image} alt={postDetails.title} style={{ width: '300px' }} />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
        <button type="button">like</button>
        <button type="button">like</button><button type="button">like</button>
      </div>
    </>
  );
}
