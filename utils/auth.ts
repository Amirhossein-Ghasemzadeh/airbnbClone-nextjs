import {compare, hash} from 'bcrypt';
// import {verify} from 'jsonwebtoken';

async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password: any, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

// function verifyToken(token, secretKey) {
//   try {
//     const result = verify(token, secretKey);
//     return {email: result.email};
//   } catch (error) {
//     return false;
//   }
// }

export {hashPassword, verifyPassword};
