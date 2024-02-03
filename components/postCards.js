// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// // deletepost goes here
// function PostCard({ postObj, onUpdate }) {
//   // FOR DELETE, WE NEED TO REMOVE THE post AND HAVE THE VIEW RERENDER,
//   // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE postS
//   const deleteThisPost = () => {
//     if (window.confirm(`Delete ${postObj.post_title}?`)) {
//       deletepost goes here (postObj.firebaseKey).then(() => onUpdate());
//     }
//   };

//   return (
//     <Card style={{ width: '18rem', margin: '10px' }}>
//       <Card.Img variant="top" src={postObj.image_url} alt={postObj?.post_title} style={{ height: '400px' }} />
//       <Card.Body>
//         <Card.Title>{postObj.post_title}</Card.Title>
//         <h5>Post Author:{postObj.post_author}</h5>
//         <h3>{postObj.post_content}</h3>
//         <h5>{postObj.created_on}</h5>

//         {/* DYNAMIC LINK TO VIEW THE post DETAILS  */}
//         <Link href={`/post/${postObj.firebaseKey}`} passHref>
//           <Button variant="primary" className="m-2">VIEW</Button>
//         </Link>
//         {/* DYNAMIC LINK TO VIEW THE post DETAILS  */}
//         <Link href={`/post/${postObj.firebaseKey}`} passHref>
//           <Button variant="primary" className="m-2">{postObj.categories}</Button>
//         </Link>
//         {/* DYNAMIC LINK TO EDIT THE post DETAILS  */}
//         <Link href={`/post/edit/${postObj.firebaseKey}`} passHref>
//           <Button variant="info">EDIT</Button>
//         </Link>
//         <Button variant="danger" onClick={deleteThisPost} className="m-2">
//           DELETE
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }

// PostCard.propTypes = {
//   postObj: PropTypes.shape({
//     image_url: PropTypes.string,
//     post_title: PropTypes.string,
//     post_author: PropTypes.string,
//     firebaseKey: PropTypes.string,
//     created_on: PropTypes.string,
//     post_content: PropTypes.string,
//     categories: PropTypes.number,
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default PostCard;
