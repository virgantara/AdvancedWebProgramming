const db = require('../db');

// Store the access token
module.exports.storeToken = (accessToken, refreshToken, access_token_expires_at, refresh_token_expires_at, userId, clientId, callback) => {
  const query = `
    INSERT INTO oauth_tokens (access_token, refresh_token, access_token_expires_at, refresh_token_expires_at, user_id, client_id) 
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const params = [accessToken, refreshToken, access_token_expires_at, refresh_token_expires_at, userId, clientId]
  db.query({sql: query, timeout: 5000},params, (err, results)=>{
    if(err){
      console.error(err)
    }

    
  });
};

module.exports.getRefreshToken = (refreshToken, callback) =>{
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM oauth_tokens WHERE refresh_token = ?
    `
    db.query(
      query,
      [refreshToken],
      (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve({
          refreshToken: results[0].refresh_token,
          refreshTokenExpiresAt: results[0].refresh_token_expires_at,
          client: { id: results[0].client_id },
          user: { id: results[0].user_id },
        });
      }
    );
  });
}

// Retrieve the access token
module.exports.getTokenByAccessToken = (accessToken, callback) => {
  const query = `
    SELECT t.access_token, t.access_token_expires_at, t.id, t.user_id,
           u.id AS user_id, u.username, u.email, t.client_id, u.uuid
    FROM oauth_tokens t
    JOIN users u ON t.user_id = u.id
    WHERE t.access_token = ?
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [accessToken], (err, results) => {
      if (err) {
        console.error(err)
        reject(err);
      }
      const token = results[0];
      if(token){
        resolve({
          accessToken: token.access_token,
          accessTokenExpiresAt: token.access_token_expires_at,
          client: { id: token.client_id },
          user: {
            id: token.user_id,
            username: token.username,
            uuid: token.uuid
          },
        });
      }
      else{
        console.warn("Token is empty")  
      }
      
      reject(new Error('Token is invalid'));
    });
  });
};

// Delete the access token
module.exports.deleteToken = (accessToken, callback) => {
  const query = 'DELETE FROM oauth_tokens WHERE access_token = ?';
  db.query(query, [accessToken], callback);
};

// Delete the access token
module.exports.revokeRefreshToken = (refreshToken, callback) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM oauth_tokens WHERE refresh_token = ?';
    db.query(query, [refreshToken], (err, results)=>{
      if (err) {
        console.error('Error revoking token:', err);
        return reject(err);
      }

      // Check if any rows were affected (i.e., the token existed and was deleted)
      const revoked = results.affectedRows > 0;
      resolve(revoked);
    });  
  })
  
};