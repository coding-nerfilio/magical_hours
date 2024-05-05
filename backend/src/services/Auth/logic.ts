import { User } from "@src/entities/User";
import { appDataSource } from "@src/index";
import { generateJWT, validatePassword } from "./utils";
import { ErrorFactory } from "@src/errors";
import { Status } from "@src/responses";

const Login = async (username: string, password: string) => {
  const userRepository = appDataSource.getRepository(User);
  let user: User | null = null;

  //Obtain user
  try {
    user = (await userRepository
      .createQueryBuilder()
      .select("*")
      .where("username=:username", { username })
      .getRawOne()) as any;
    if (user === null) throw "";
  } catch (err) {
    console.log(err);
    throw ErrorFactory(Status.INPUT_VALIDATION_ERROR, "invalid_credentials");
  }

  //Validate password
  let isValid = false;
  try {
    isValid = await validatePassword(user.password, password);
  } catch (err) {
    throw ErrorFactory(Status.INPUT_VALIDATION_ERROR, "invalid_credentials");
  }

  if (isValid) {
    return { user, token: generateJWT(user) };
  } else {
    throw ErrorFactory(Status.INPUT_VALIDATION_ERROR, "invalid_credentials");
  }
};

export const Logic = { Login };
