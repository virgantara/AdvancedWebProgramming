const db = require('../db');
const { storeToken, getTokenByAccessToken, getRefreshToken,revokeRefreshToken } = require('./token_model');
const { findUserByUsername } = require('./user_model');
const bcrypt = require('bcrypt');
module.exports.getClient = (clientId) => {
  
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM oauth_clients WHERE id = ? ';
    db.query(query, [clientId], (err, results) => {
      // console.log(results)
      if (err) return reject(err);

      if(results.length === 0){
        
        return reject('client_id not found');
      }
        
      else{

        const client = {
          id: results[0].id,
          redirectUris: [results[0].redirect_uri],
          grants: ['password','refresh_token','authorization_code'],
        }
        resolve(client);  
      }
      
      
    });
  })
  
}

module.exports.getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    findUserByUsername(username, (err, user) => {
      if (err) {
        console.error('Error finding user:', err);
        return reject(err);
      }

      if (!user) {
        console.log('User not found');
        return resolve(null);
      }

      const userPassword = user.password_hash.replace(/^\$2y\$/, '$2a$');
      bcrypt.compare(password, userPassword, (err, isValid) => {
        if (err) {
          console.error('Error comparing password:', err);
          return reject(err);
        }

        if (!isValid) {
          console.log('Password mismatch');
          return resolve(null);
        }

        resolve(user);
      });
    });
  });
};

module.exports.saveAuthorizationCode = (code, client, user) => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO oauth_authorization_codes (authorization_code, client_id, user_id, expires_at, redirect_uri,scope) 
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    let params = [code.authorizationCode, client.id, user.id, code.expiresAt, code.redirectUri,code.scope]
    db.query(query, params, (err, res)=>{
        if(err){
            console.error(err)
            return reject(err)
        }

        const authCode = {
            authorizationCode: code.authorizationCode,
            expiresAt: code.expiresAt,
            redirectUri: client.redirectUris[0],
            client: client,
            user: user,
            scope: code.scope
        };

        resolve(authCode)
    })
  })
};

module.exports.getAuthorizationCode = async (authorizationCode) => {

  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM oauth_authorization_codes WHERE authorization_code = ?', [authorizationCode], (err, results) => {
          if (err) {
              console.error("getAuthorizationCode ERROR:",err)
              return reject(err)

          };

          if (results.length === 0) return resolve(false);
          
          const hasil = {
              code: results[0].authorization_code,
              scope: results[0].scope,
              expiresAt: results[0].expires_at,
              redirectUri: results[0].redirect_uri,
              client: { id: results[0].client_id },
              user: { id: results[0].user_id }
          }

          resolve(hasil);
      });
  })
};

module.exports.revokeAuthorizationCode = (code, callback) => {
   // c
  return new Promise((resolve, reject) => {
      db.query('DELETE FROM oauth_authorization_codes WHERE authorization_code = ?', [code.code], (err,result) => {
          if (err) {
              console.error("Error Deleting auth code",err)
              return reject(err)
          }
          onsole.log("CODE",code.code)
          resolve(true)
      });    
  })
    
}

module.exports.validateScope = (user, client, scope, callback) => {
  return new Promise((resolve, reject)=>{
    const validScopes = ['read', 'write', 'delete'];

    const isValid = scope.split(' ').every(s => validScopes.includes(s));

    if (!isValid) return reject(false);


    resolve(scope);
  })
}


module.exports.getRefreshToken = async (refreshToken) => {
  return getRefreshToken(refreshToken);
};

module.exports.revokeToken = async (token) => {
  return revokeRefreshToken(token.refreshToken)
}

/**
 * Get the access token.
 */
module.exports.getAccessToken = async (accessToken) => {
  return getTokenByAccessToken(accessToken);
};

/**
 * Save the token.
 */
module.exports.saveToken = async (token, client, user) => {
  // console.log(user)
  const accessToken = {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    client: client,
    user: user,
  };
  

  await storeToken(token.accessToken, token.refreshToken, token.accessTokenExpiresAt, token.refreshTokenExpiresAt, user.id, client.id);
  return accessToken;
};
