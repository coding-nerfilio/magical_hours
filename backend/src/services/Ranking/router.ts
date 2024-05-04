import Express from "express";
import { User } from "@src/entities/User";
import { appDataSource } from "@src/index";
import { HOUR_TYPE, HourEntry } from "@src/entities/HourEntry";
import { DefaultResponses } from "@src/responses";
import AuthService from "@src/services/Auth";

const Router = Express.Router();

Router.use(AuthService.Middleware.validateJWT).get(
  "/magical_hours/api/v1/ranking/get",
  async (req, res) => {
    const userId: number = (req as any).user.id;
    const userRepository = appDataSource.getRepository(User);
    const hourEntryRepository = appDataSource.getRepository(HourEntry);
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["friends"],
    });

    const rankingUsers = [user, ...user?.friends!];

    let ranking = {
      entries: new Array<{ user: User; points: number }>(),
    };

    for (let user of rankingUsers) {
      if (user !== null) {
        const hours = await hourEntryRepository.find({ where: { user: user } });
        let points = 0;
        if (hours.length > 0) {
          points = hours.reduce((acc, entry) => {
            // Sumar el valor de la entrada al acumulador

            switch (entry.type) {
              case HOUR_TYPE.MIRROR:
                acc += 15;
                break;
              case HOUR_TYPE.TRIANGLE:
                acc += 7;
                break;
              case HOUR_TYPE.REVERSE:
                acc += 9;
                break;
            }
            return acc;
          }, 0);
        }

        ranking.entries = [...ranking.entries, { user, points }];
      }
    }

    ranking.entries = ranking.entries.sort((a, b) => b.points - a.points);

    DefaultResponses.FoundData(res, { ranking });
  }
);

export default Router;
