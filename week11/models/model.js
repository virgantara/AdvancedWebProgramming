const db = require('../db');

module.exports.getClient = (clientId, clientSecret) => {

  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM oauth_clients WHERE client_id = ? and client_secret = ? ';
    db.query(query, [clientId, clientSecret], (err, results) => {

      if (err) return reject(err);

      if(results.length == 0)
        return reject(null)
      
      const client = {
        id: results[0].client_id,
        redirectUris: results[0].redirect_uri,
        grants: ['authorization_code']
      }
      resolve(client);
    });
  })
  
}