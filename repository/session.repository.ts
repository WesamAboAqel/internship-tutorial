import { Post } from "../models/post.model.js";
import {
    ISessionInit,
    ISessionRefresh,
    Session,
} from "../models/session.model.js";
import { sequelize } from "../services/sequalize.service.js";

// @param      params - ISessionInit
// @returns    session - Session
// @notes      Create Session
export const addSession = async (params: ISessionInit): Promise<Session> => {
    try {
        // console.log("Test");
        const session = await Session.create({
            user_id: params.user_id,
            refreshTokenHash: params.refreshTokenHash,
        });
        // console.log(session.refreshTokenHash, params.refreshTokenHash);

        return session;
    } catch (error) {
        throw error;
    }
};

// @param      params - ISessionRefresh
// @returns    session - Session
// @notes      Refresh Session by taking old refresh Token and making a new session
export const refreshSession = async (
    params: ISessionRefresh,
): Promise<Session> => {
    const transaction = await sequelize.startUnmanagedTransaction();
    try {
        const oldSession = await Session.findOne({
            where: {
                refreshTokenHash: params.oldRefreshTokenHash,
            },
            transaction: transaction,
        });
        // console.log(oldSession);

        if (!oldSession) {
            throw new Error();
        }

        await oldSession.update({
            revokedAt: new Date(),
        });

        const newSession = await Session.create({
            user_id: oldSession.user_id,
            refreshTokenHash: params.newRefreshToken,
        });

        await transaction.commit();

        return newSession;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
