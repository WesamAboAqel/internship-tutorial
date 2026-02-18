import redis from "redis";

export const redisClient = redis.createClient({
    socket: {
        port: parseInt(process.env.REDIS_PORT!),
        host: process.env.REDIS_HOST!,
    },
});

// export default redisClient;

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Redis connected successfully.");
    } catch (error) {
        console.error("Unable to connect to Redis:", error);
    }
};
