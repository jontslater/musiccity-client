import { clientCredentials } from '../utils/client';

const getSingleCategory = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/menuitems`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getSingleCategory;
