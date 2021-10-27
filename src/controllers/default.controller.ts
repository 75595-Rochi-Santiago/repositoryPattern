import { Request, Response } from "express";
import { route, GET } from "awilix-express";
import { TestService } from "../services/test.service";

@route("/")
export class DefaultController {
  @GET()
  public index(req: Request, res: Response): void {
    res.send("Running...");
  }
}
