import { HOUR_TYPE, HourEntry } from "@src/entities/HourEntry";
import { User } from "@src/entities/User";
import { ErrorFactory } from "@src/errors";
import { appDataSource } from "@src/index";
import { Status } from "@src/responses";
import { Profile } from "@src/types";

export async function usernameExists(username: string): Promise<boolean> {
  const userRepository = appDataSource.getRepository(User);
  return await userRepository.existsBy({ username: username });
}

// Función para verificar si un usuario ya es amigo de otro
export function isFriend(friends: User[], friendUsername: string): boolean {
  return friends.some((f) => f.username === friendUsername);
}

// Función para agregar amigos a un usuario
export async function addFriend(user: User, friendsUsername: string) {
  const userRepository = appDataSource.getRepository(User);

  let friends = user.friends;

  if (
    (await usernameExists(friendsUsername)) &&
    !isFriend(friends, friendsUsername)
  ) {
    const friend = await userRepository.findOneBy({
      username: friendsUsername,
    });
    friends = [...friends, friend!];
    user.friends = friends;
    await userRepository.save(user);
  }

  return friends;
}

//Get user's profile
export async function getMinimalProfile(username: string): Promise<Profile> {
  const userRepository = appDataSource.getRepository(User);
  const hourRepository = appDataSource.getRepository(HourEntry);
  let user: null | User = null;

  try {
    user = await userRepository.findOneOrFail({ where: { username } });
  } catch (error) {
    throw ErrorFactory(Status.DATA_NOT_FOUND, "profile_not_found");
  }

  return {
    user,
    metadata: {
      totalHours: await hourRepository.count({ where: { user } }),
      mirrorHours: await hourRepository.count({
        where: { user, type: HOUR_TYPE.MIRROR },
      }),
      triangleHours: await hourRepository.count({
        where: { user, type: HOUR_TYPE.TRIANGLE },
      }),
    },
  };
}
