import { Request, Response, NextFunction } from "express";
import { CustomError, ValidationError, InternalError, ContentNotFoundError } from "./middleware_utils/errors";

// const handleError = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
//     ) => {
//         console.error(err);

//         if (err instanceof ValidationError) {
//             res
//                 .sendStatus(err.code)
//                 .json({
//                     message: err.message
//                 });
//             };
        

// }
