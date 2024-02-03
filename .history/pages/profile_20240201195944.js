import React from 'react';

function handleChange() {

}

export default function Profile() {
  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Upload</button>
      First Name
      Last Name
      Your Post
      Post Cards
    </div>
  );
}
