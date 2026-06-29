import { Request, Response, NextFunction } from "express";
import { ZodError, ZodTypeAny } from "zod";

interface ValidationSchema {
    body?: ZodTypeAny;
    params?: ZodTypeAny;
    query?: ZodTypeAny;
}

const validate =
    (schema: ValidationSchema) =>
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            try {
                if (schema.body) {
                    req.body = await schema.body.parseAsync(req.body);
                }

                if (schema.params) {
                    req.params = await schema.params.parseAsync(req.params);
                }

                if (schema.query) {
                    req.query = await schema.query.parseAsync(req.query);
                }

                next();
            } catch (err) {
                if (err instanceof ZodError) {

                    const message = err.issues
                        .map(issue => issue.message)
                        .join(", ");

                    return res.status(400).json({
                        success: false,
                        message,
                    });
                }

                next(err);
            }
        };

export default validate;