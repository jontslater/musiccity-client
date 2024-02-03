import React from 'react';

function handleChange() {

}

function handleClick() {

}

export default function Profile() {
  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button type="button" onClick={handleClick}>Upload</button>
      <img alt="Avatar" className="avatar" />
      First Name
      Last Name
      Your Post
      Post Cards
    </div>
  );
}
