import { Request, Response, NextFunction } from "express";
import { CustomError } from "./middleware_utils/errors";

export const handleError = (
    err: CustomError | Error,
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        console.error(err);

        if (err instanceof CustomError){
            res
                .sendStatus(err.code)
                .json({
                    message: err.message
                });
        }

        if (err instanceof Error) {
            res
                .sendStatus(500)
                .json({
                    message: 'Server internal error. Please, try again later'
                });
        }
        
        next();

}
