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
          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/80ff523f-ff84-457d-a547-464588d3a3d3/der88pg-7daa00fc-5aa9-4e2b-9850-53d11492329a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgwZmY1MjNmLWZmODQtNDU3ZC1hNTQ3LTQ2NDU4OGQzYTNkM1wvZGVyODhwZy03ZGFhMDBmYy01YWE5LTRlMmItOTg1MC01M2QxMTQ5MjMyOWEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2DGSAajqzY-MmYLPi9v6gfi3HMYWrs0p0Ac8jV8OBAQ" className="rounded float-start" alt="..." />
          <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
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
