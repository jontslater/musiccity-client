import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getCategories } from '../api/categories';
import { createPost, updatePost } from '../api/posts';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  id: 0,
  image_url: '',
  post_title: '',
  post_content: '',
  created_on: '',
  categories: 0,
};

const PostForm = ({ postObj }) => {
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [currentPost, setCurrentPost] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategoryTypes);

    if (postObj.id) {
      setCurrentPost({
        id: postObj.id,
        postTitle: postObj.post_title,
        postContent: postObj.post_content,
        categories: postObj.categories?.id,
        postAuthor: user.id,
        imageUrl: postObj.image_url,
      });
    }
  }, [postObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (postObj.id) {
      const update = {
        id: postObj.id,
        postTitle: currentPost.post_title,
        imageUrl: currentPost.image_url,
        postContent: currentPost.post_content,
        categories: Number(currentPost.categories),
        postAuthor: user.id,
        createdOn: currentPost.created_on,
      };
      await updatePost(currentPost.id, update);
      router.push(`/posts/${postObj.id}`);
    } else {
      const payload = { ...currentPost, post_author: user.id };
      await createPost(payload);
      router.push('/');
    }
  };
  return (
    <div className="post-form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="post-form">Post Title</Form.Label>
          <Form.Control name="post_title" placeholder="Enter Post Title Here" required value={currentPost.post_title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Post Content</Form.Label>
          <Form.Control name="post_content" placeholder="Content" required value={currentPost.post_content} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>image Url</Form.Label>
          <Form.Control name="image_url" placeholder="image url here" required value={currentPost.image_url} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category Type</Form.Label>
          <Form.Select
            name="categories"
            required
            value={currentPost.categories}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categoryTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="post-enter-btn">
          {postObj.id ? 'Update' : 'Create'} Submit
        </Button>
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  postObj: PropTypes.shape({
    image_url: PropTypes.string,
    post_title: PropTypes.string,
    post_author: PropTypes.number,
    id: PropTypes.number,
    created_on: PropTypes.string,
    post_content: PropTypes.string,
    categories: PropTypes.number,
  }),
};

PostForm.defaultProps = {
  postObj: initialState,
};

export default PostForm;
