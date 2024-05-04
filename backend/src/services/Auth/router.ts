import { User } from "@src/entities/User";
import Express from "express";
import { appDataSource } from "@src/index";
import { DefaultResponses } from "@src/responses";
import { generateJWT, hashPassword } from "@src/services/Auth/utils";
import { Logic } from "@src/services/Auth/logic";
import { Error } from "@src/errors";

const Router = Express.Router();

Router.post(
  "/magical_hours/api/v1/auth/login",
  async (
    req: Express.Request<{}, { username: string; password: string }>,
    res: any
  ) => {
    const { username, password } = req.body;
    Logic.Login(username, password)
      .then((value) => {
        res.send(DefaultResponses.OkResponse(value, "Login exitoso"));
      })
      .catch((err: Error) => {
        res.send(DefaultResponses.ErrorResponse(err.status, err.message));
      });
  }
);

Router.post(
  "/magical_hours/api/v1/auth/register",
  async (
    req: Express.Request<
      {},
      { username: string; password: string; rePassword: string }
    >,
    res
  ) => {
    console.log(req.body);
    const { username, password, rePassword } = req.body;
    for (let value of [username, password, rePassword]) {
      if (value === null || value === undefined || value === "") {
        return DefaultResponses.InputValidationError(res);
      }
    }

    if (password !== rePassword)
      return DefaultResponses.InputValidationError(res);

    const userRepository = appDataSource.getRepository(User);
    let user = new User();
    user.id = 0;
    user.username = username;
    user.password = await hashPassword(password);

    try {
      await userRepository.save(user);
    } catch (error) {
      console.log(error);
      if ((error as any).code == 23505) {
        return DefaultResponses.UserAlreadyExists(res);
      } else {
        return DefaultResponses.ServerError(res);
      }
    }

    const token = generateJWT(user);

    return DefaultResponses.FoundData(res, { user, token });
  }
);

export default Router;
