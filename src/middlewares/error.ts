import { NextFunction, Request, Response } from 'express';

export interface IError extends Error {
  statusCode: number;
}

const errorSenter = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const Status = {
        OK: 200,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
      };
  const { statusCode = Status.INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === Status.INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
  });
  return next();
};

export default errorSenter;