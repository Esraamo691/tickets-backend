export const generateHash = async ({
  plaintext = "",
  saltRound = process.env.SALT_ROUNDS,
}={}) => {
    return bcrypt.hashSync(plaintext,parseInt(saltRound))
};
export const compareHash = async ({
  plaintext = "",
 hashValue=""
}={}) => {
    return bcrypt.compareSync(plaintext,hashValue)
};