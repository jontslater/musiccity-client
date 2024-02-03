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

export { getSinglePostReaction, getPostReactions };
