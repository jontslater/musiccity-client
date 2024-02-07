import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/posts';
import PostForm from '../../../components/postForm';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the id
  const { id } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);

  // TODO: pass object to form
  return (<PostForm postObj={editItem} />);
}
