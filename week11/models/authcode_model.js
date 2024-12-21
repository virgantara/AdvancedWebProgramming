
module.exports.saveAuthorizationCode = (code, client, user, callback) => {
    return new Promise((resolve, reject) => {
        const query = `
        INSERT INTO oauth2_authorization_codes (authorization_code, client_id, user_id, expires_at, redirect_uri,scope) 
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

module.exports.getAuthorizationCode = (authorizationCode, callback) => {

    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM oauth2_authorization_codes WHERE authorization_code = ?', [authorizationCode], (err, results) => {
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

    
}

module.exports.revokeAuthorizationCode = (code, callback) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM oauth2_authorization_codes WHERE authorization_code = ?', [code.authorizationCode], (err) => {
            if (err) {
                console.error("Error Deleting auth code",err)
                return reject(err)
            }

            resolve(true)
        });    
    })
    
}
