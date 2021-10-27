import { Request, Response } from "express";
import { route, GET, POST, PUT, DELETE } from "awilix-express";
import { SubscriptionService } from "../services/subscription.service";
import { BaseController } from "../common/controllers/base.controller";

@route("/subscriptions")
export class SubscriptionController extends BaseController {
  //inyectar dependencia del servicio creado
  constructor(private readonly subscriptionService: SubscriptionService) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response) {
    try {
      res.send(this.subscriptionService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }
  @route(":id")
  @GET()
  public async find(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      res.send(this.subscriptionService.find(id));
    } catch (error) {
      this.handleException(error, res);
    }
  }
  @POST()
  public async store(req: Request, res: Response) {
    try {
      await this.subscriptionService.store({
        user_id: req.body.user_id,
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron,
      } as SubscriptionCreateDto); //mapear reques a dto
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }
  @route(":id")
  @PUT()
  public async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.subscriptionService.update(id, {
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron,
      } as SubscriptionUpdateDto); //mapear reques a dto
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }
  @route(":id")
  @DELETE()
  public async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.subscriptionService.remove(id);
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
