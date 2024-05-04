import Express from "express";
import moment from "moment-timezone";
import { isMirror, isReverse, isTriangle } from "./utils";
import { DefaultResponses } from "src/responses";
import { appDataSource } from "@src/index";
import { HOUR_TYPE, HourEntry } from "@src/entities/HourEntry";
import AuthService from "@src/services/Auth";

const Router = Express.Router();

Router.use(AuthService.Middleware.validateJWT).post(
  "/magical_hours/api/v1/game/submitHour",
  (req: Express.Request<{}, { timezone: number }>, res) => {
    const { timezone } = req.body;
    const currentTime = moment.utc();
    const localizedTime = currentTime.utcOffset(timezone);

    const hhmm = localizedTime.format("HH:mm");

    const hourEntryRepository = appDataSource.getRepository(HourEntry);
    let hourEntry = null;

    if (isMirror(hhmm)) {
      hourEntry = new HourEntry();
      hourEntry.type = HOUR_TYPE.MIRROR;
    } else if (isTriangle(hhmm)) {
      hourEntry = new HourEntry();
      hourEntry.type = HOUR_TYPE.TRIANGLE;
    } else if (isReverse(hhmm)) {
      hourEntry = new HourEntry();
      hourEntry.type = HOUR_TYPE.REVERSE;
    }

    if (hourEntry !== null) {
      hourEntry.user = (req as any).user;
      hourEntry.hour = hhmm;
      hourEntry.id = 0;
      hourEntryRepository.save(hourEntry);
      return DefaultResponses.FoundData<{}>(res, {});
    } else {
      return DefaultResponses.DataNotFound(res);
    }
  }
);

export default Router;
