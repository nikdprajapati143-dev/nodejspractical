import { Request, Response, NextFunction } from "express";

import ApiError from "../utils/ApiError";

import UserRole from "../enums/role.enum";

const authorize =
    (...roles: UserRole[]) =>
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {

            if (!req.user) {
                return next(
                    new ApiError(
                        401,
                        "Unauthorized"
                    )
                );
            }

            if (!roles.includes(req.user.role)) {
                return next(
                    new ApiError(
                        403,
                        "Forbidden"
                    )
                );
            }

            next();
        };

export default authorize;