import { clientCredentials } from '../utils/client';

const getSinglePostReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_reactions/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPostReactions = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}/reactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_reactions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePostReaction = (payload, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_reactions/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const addPostReaction = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_reactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getSinglePostReaction, getPostReactions, deleteSingleReaction, updatePostReaction, addPostReaction,
};
