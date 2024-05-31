import Express from "express";
import AuthService from "@src/services/Auth";
import { DefaultResponses } from "@src/responses";
import { submitHour } from "./logic";
import { Error } from "@src/errors";

const Router = Express.Router();

Router.use(AuthService.Middleware.validateJWT).post(
  "/magical_hours/api/v1/game/submitHour",
  async (req: Express.Request, res) => {
    const { timezone } = req.body;

    try {
      res.send(
        DefaultResponses.OkResponse(
          await submitHour(timezone, (req as any).user),
          "hour_success"
        )
      );
    } catch (error) {
      let e = error as Error;
      res.send(DefaultResponses.ErrorResponse(e.status, e.message));
    }
  }
);

export default Router;
