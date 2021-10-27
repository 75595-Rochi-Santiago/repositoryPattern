import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import express from "express";
import { SubscriptionMySQLRepository } from "./services/repositories/impl/mysql/subscription.repository";
import { TestService } from "./services/test.service";
import { SubscriptionService } from "./services/subscription.service";
export default (app: express.Application) => {
  const container = createContainer({ injectionMode: "CLASSIC" });

  //DEPENDENCIAS PARA SER INYECTADAS ATRAVEZ DE LOS CONSTRUCTORES
  container.register({
    //repositorios
    subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),

    //servicios
    subscriptionService: asClass(SubscriptionService).scoped(),
    testService: asClass(TestService).scoped(),
  });
  app.use(scopePerRequest(container));
};
