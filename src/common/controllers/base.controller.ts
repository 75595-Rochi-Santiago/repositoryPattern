import { Response } from "express";
import { AplicationException } from "../exceptions/application.exception";
export abstract class BaseController {
  handleException(err: any, res: Response) {
    if (err instanceof AplicationException) {
      res.status(400);
      res.send();
    } else {
      throw new Error(err);
    }
  }
}
