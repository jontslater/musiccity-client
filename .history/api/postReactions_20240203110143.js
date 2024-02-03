import { clientCredentials } from '../utils/client';

const getSinglePostReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_reactions/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPostReactions = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_reactions`, {
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

const updatePostReaction = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post_reactions/`, {
    method: 'PATCH',
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
  getSinglePostReaction, getPostReactions, deleteSingleReaction, updatePostReaction,
};
