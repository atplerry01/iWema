import * as Redis from "ioredis";

export const redis = new Redis({
    port: Number(process.env.REDIS_PORT),          // Redis port
    host: process.env.REDIS_HOST,   // Redis host
    family:  Number(process.env.REDIS_FAMILY),           // 4 (IPv4) or 6 (IPv6)
    // password: process.env.REDIS_PASSWORD,
    db:  Number(process.env.REDIS_DB)
  });






