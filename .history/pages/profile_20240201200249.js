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
      <img src="https://static.vecteezy.com/system/resources/previews/008/302/462/non_2x/eps10-grey-user-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg" alt="Avatar" className="avatar" />
      First Name
      Last Name
      Your Post
      Post Cards
    </div>
  );
}
