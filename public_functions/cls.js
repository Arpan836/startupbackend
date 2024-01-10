const crypto = require('crypto');

// Replace these with your own secret key and initialization vector (IV).
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16); 
const encrypt=(text)=>{
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

const decrypt=(encrypted)=>{
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
