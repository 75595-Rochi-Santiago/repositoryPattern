process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

import dotenv = require("dotenv");
import express = require("express");
import { loadControllers } from "awilix-express";
import loadContainer from "./container";

dotenv.config({ path: `${__dirname}/../config/${process.env.APP_ENV}.env` });
console.log(process.env.APP_FOO);

const app: express.Application = express();

//JSON Support
app.use(express.json());

//container
loadContainer(app);

//controllers
app.use(loadControllers("controllers/*ts", { cwd: __dirname }));

//import { TestService } from "./services/test.service";
//
//const testService = container.resolve<TestService>("testService");
//console.log(testService.get());

export { app };
