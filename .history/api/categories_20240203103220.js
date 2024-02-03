import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleCategory = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories_view.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
