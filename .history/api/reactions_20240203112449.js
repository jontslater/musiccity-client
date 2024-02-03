import { clientCredentials } from '../utils/client';

const getAllReactions = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reactions/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getAllReactions, getSingleReaction };
