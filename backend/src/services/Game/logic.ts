import { HOUR_TYPE, HourEntry } from "@src/entities/HourEntry";
import { appDataSource } from "@src/index";
import { isMirror, isReverse, isTriangle } from "./utils";
import moment from "moment";
import { User } from "@src/entities/User";
import { Status } from "@src/responses";
import { ErrorFactory } from "@src/errors";

export const submitHour = async (timezone: string, user: User) => {
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
    hourEntry.user = user;
    hourEntry.hour = hhmm;
    hourEntry.id = 0;
    try {
      await hourEntryRepository.save(hourEntry);
    } catch {
      throw ErrorFactory(Status.SERVER_FAILED, "server_error");
    }
    return hourEntry;
  } else {
    throw ErrorFactory(Status.HOUR_FAILED, "hour_failed");
  }
};
