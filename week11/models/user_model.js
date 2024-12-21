const bcrypt = require('bcrypt');
const db = require('../db');
const crypto = require('crypto')

const createUser = (username, password, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], callback);
  });
};

const findUserByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

const findUserByResetToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id FROM users 
      WHERE password_reset_token = ? 
      AND password_reset_token_expiry > NOW()
      `,[token], (err, users) => {
        if(err){
          return reject(err)
        }

        else{
          resolve(users[0] || null)
        }
      }
    );
  })
    
};

const generateResetToken = (userId) => {
  return new Promise((resolve, reject) => {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiryTime = new Date(Date.now() + 3600000); // Token valid for 1 hour

    db.query(
        `UPDATE users 
        SET password_reset_token = ?, 
        password_reset_token_expiry = ? 
        WHERE id = ?`,
        [resetToken, expiryTime, userId],
        (err, result)=>{
          if(err){
            return reject(err)
          }

          else
            resolve(resetToken)
        }
    );
  })
    
};

const updateUserPassword = (userId, newPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(newPassword, 13, (err, hashedPassword) => {
        if (err) 
          return reject(err);
        
        const hashedPasswordReplaced = hashedPassword.replace(/^\$2b\$/, '$2y$');
        db.query(
            `
            UPDATE users SET password_hash = ?, password_reset_token = NULL, password_reset_token_expiry = NULL WHERE id = ?;
            `,
            [hashedPasswordReplaced, userId],(err, results)=>{
              if(err){
                return reject(err)
              }

              else{
                resolve(results)
              }
            }
        );
      });
        
        
    })
};

const findUserById = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = ?', [user_id], (err, results) => {
      if (err){
        console.error("findUserByIdERROR: ",err)
        return reject(err)
      } 
      resolve(results[0]);
    });  
  })
  
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err){
        console.error("findUserByEmailERROR: ",err)
        return reject(err)
      } 
      resolve(results[0]);
    });  
  })
  
};

module.exports = { 
  createUser, 
  findUserByUsername, 
  findUserById, 
  findUserByEmail,
  findUserByResetToken,
  updateUserPassword,
  generateResetToken
};
