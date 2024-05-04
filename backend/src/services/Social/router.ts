import Express from "express";
import AuthService from "../Auth";
import { User } from "@src/entities/User";
import { appDataSource } from "@src/index";
import { DefaultResponses } from "@src/responses";
import { addFriend } from "@src/services/Social/logic";

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

export default Router;
