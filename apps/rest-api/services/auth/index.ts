import jwt from "jsonwebtoken";

const JWT_PASSPHRASE: string = process.env["JWT_PASSPHRASE"] || "";

export default {
  sign: (payload: any) => {
    return jwt.sign(payload, JWT_PASSPHRASE, { expiresIn: 5600 });
  },
  verify: (token: any) => {
    try {
      return jwt.verify(token, JWT_PASSPHRASE);
    } catch (err) {
      return false;
    }
  },
  decode: (token: any) => {
    return jwt.decode(token);
  },
};
