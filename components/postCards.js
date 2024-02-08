import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePost } from '../api/posts';
import { useAuth } from '../utils/context/authContext';

const getCategoryButtonColor = (categories) => {
  switch (categories) {
    case 'art':
      return '';
    case '3':
      return 'warning';
    default:
      return 'primary';
  }
};

function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();

  const handleDeletePost = () => {
    const confirmDelete = window.confirm(`Delete ${postObj.post_title}?`);
    if (confirmDelete) {
      deletePost(postObj.id).then(onUpdate);
    }
  };

  const canEditAndDelete = user && user.uid === postObj.post_author.uid;

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img
        variant="top"
        src={postObj.image_url}
        alt={postObj.post_title}
        style={{ height: '400px' }}
      />
      <Card.Body>
        <Card.Title>{postObj.post_title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Post Author: {postObj.post_author.first_name}
        </Card.Subtitle>
        <Card.Text>{postObj.post_content}</Card.Text>
        <Card.Text>Created on: {postObj.created_on}</Card.Text>

        <Link href={`/posts/${postObj.id}`} passHref>
          <Button id="viewButton" variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>

        <Link href={`/posts/${postObj.id}`} passHref>
          <Button variant={getCategoryButtonColor(postObj.categories.label)} className="m-2">
            {postObj.categories.label}
          </Button>
        </Link>

        {canEditAndDelete && (
          <>
            <Link href={`/posts/edit/${postObj.id}`} passHref>
              <Button id="editButton" variant="info">EDIT</Button>
            </Link>

            <Button id="deleteButton" variant="danger" onClick={handleDeletePost} className="m-2">
              DELETE
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    image_url: PropTypes.string,
    post_title: PropTypes.string,
    post_author: PropTypes.shape({
      uid: PropTypes.string,
      first_name: PropTypes.string,
    }),
    id: PropTypes.number,
    created_on: PropTypes.string,
    post_content: PropTypes.string,
    categories: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
