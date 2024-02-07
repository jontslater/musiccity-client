import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/posts';
import { getAllReactions } from '../../api/reactions';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [reactions, setReactions] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getAllTheReactions = () => {
    getAllReactions(id).then((reactionsData) => setReactions(reactionsData));
  };

  useEffect(() => {
    // Fetch post details
    getSinglePost(id)
      .then((data) => setPostDetails(data));
  }, [id]);

  useEffect(() => {
    // Fetch reactions when the component mounts or when id changes
    getAllTheReactions();
  }, [id]);

  return (
    <>
      {/* Your post details rendering code */}

      <div className="d-flex flex-wrap">
        {reactions.map((react) => (
          <button type="button" key={react.id}>
            <img src={react.image_url} alt={react.alt_text} style={{ width: '50px' }} />
          </button>
        ))}
      </div>

      {/* Additional content */}
    </>
  );
}
