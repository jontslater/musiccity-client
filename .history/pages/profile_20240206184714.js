import React from 'react';

export default function Profile() {
  return (
    <div />
  );
}

useEffect(() => {
  getSinglePost(id, user.uid)
    .then((data) => setPostDetails(data))
    .catch((error) => console.error(error));
});
