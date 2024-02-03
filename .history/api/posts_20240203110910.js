import { clientCredentials } from '../utils/client';

const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAllPost = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getSinglePost, getAllPost };
