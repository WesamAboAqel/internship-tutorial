import { Request, Response, NextFunction } from "express";
import { redisClient } from "../services/redis.service.js";

// @desc    Rate limits to 5 requests per 15 seconds
// @route   *
// @access  Private
export const ratelimit = async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const key = `rate-limit-${request.ip}`;

    const count = await redisClient.incr(key);

    if (count == 1) {
        redisClient.expire(key, 15);
    }

    const delay = await redisClient.ttl(key);

    if (count > 5) {
        response.send({
            msg: `You hit the rate limit, try again in ${delay} seconds`,
        });
    }

    next();
};
