export const generateEncryption = async ({
  plaintext = "",
  secretKey = process.env.ENCRYPTION_KEY,
} = {}) => {
    return CryptoJS.AES.encrypt(plaintext,secretKey).toString()
};


export const generateDecryption = async ({
  ciphertext = "",
  secretKey = process.env.ENCRYPTION_KEY,
} = {}) => {
    return CryptoJS.AES.decrypt(ciphertext, secretKey).toString(
      CryptoJS.enc.Utf8,
    );
};

