import { Request, Response, NextFunction } from "express";

import User from "../models/User.model";

import ApiError from "../utils/ApiError";

import { verifyToken } from "../utils/jwt";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(
            new ApiError(
                401,
                "Authorization header missing"
            )
        );
    }

    if (!authHeader.startsWith("Bearer ")) {
        return next(
            new ApiError(
                401,
                "Invalid authorization format"
            )
        );
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.id).select("+token");;

        if (!user) {
            return next(new ApiError(401, "User not found"));
        }

        if (!user.token || user.token !== token) {
            return next(new ApiError(401, "Session expired. Please login again."));
        }

        req.user = user;

        next();

    } catch {

        return next(
            new ApiError(
                401,
                "Invalid or expired token"
            )
        );

    }

};

export default authMiddleware;