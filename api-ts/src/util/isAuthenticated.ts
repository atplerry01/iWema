import { redis } from "./redis";

export const isAuthenticated = (req, jwt) => {

  return new Promise((resolve, reject) => {
    const token = req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET as string, async(err, decoded) => {
        if (err) {
          return reject({ err: err, message: "Unauthorized user" });
        }  else {

          const redisToken = await redis.get(`${decoded.data.mail.toLowerCase()}token`);
          if (!redisToken || token !== redisToken) {
            return reject({ err: err, message: "Unauthorized user" });
          } 

            const _secControl = await redis.get(`${decoded.data.mail.toLowerCase()}SecurityControl`);
            if (!_secControl) {
                return reject({ err: err, message: "Unauthorized user" });
            } 

            const secControl = JSON.parse(_secControl);
            Object.keys(secControl).forEach(k => {
                decoded[k] = secControl[k];             
            });

            return resolve(decoded);
            }        
      });
    }
  });
};
