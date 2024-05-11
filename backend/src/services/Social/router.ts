import Express from "express";
import AuthService from "../Auth";
import { User } from "@src/entities/User";
import { appDataSource } from "@src/index";
import { DefaultResponses } from "@src/responses";
import { addFriend, getMinimalProfile } from "@src/services/Social/logic";
import { Error } from "@src/errors";

const Router = Express.Router();

Router.use(AuthService.Middleware.validateJWT).get(
  "/magical_hours/api/v1/social/getFriends",
  async (req, res) => {
    let user: User | null = (req as any).user;

    const userRepository = appDataSource.getRepository(User);

    user = await userRepository.findOne({
      where: { id: user!.id },
      relations: ["friends"],
    });

    const friends = user?.friends || [];

    DefaultResponses.FoundData(res, { friends });
  }
);

Router.use(AuthService.Middleware.validateJWT).post(
  "/magical_hours/api/v1/social/addFriend",
  async (req, res) => {
    const { username } = req.body;
    let user: User | null = (req as any).user;

    if (username === user?.username) {
      return DefaultResponses.DataNotFound(res);
    }

    const userRepository = appDataSource.getRepository(User);

    user = await userRepository.findOne({
      where: { id: user!.id },
      relations: ["friends"],
    });

    let result = await addFriend(user!, username);

    DefaultResponses.FoundData(res, { friends: result });
  }
);

Router.use(AuthService.Middleware.validateJWT).get(
  "/magical_hours/api/v1/social/profile/minimal/:username",
  async (req, res) => {
    const { username } = req.params;

    try {
      res.send(
        DefaultResponses.OkResponse(
          await getMinimalProfile(username),
          "profile_found"
        )
      );
    } catch (error) {
      let e = error as Error;
      res.send(DefaultResponses.ErrorResponse(e.status, e.message));
    }
  }
);

export default Router;
