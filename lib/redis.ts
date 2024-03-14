import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "";
const connection = new Redis(REDIS_URL, { maxRetriesPerRequest: null });

export { connection };
