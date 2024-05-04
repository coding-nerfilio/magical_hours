import { User } from "@src/entities/User";
import { appDataSource } from "@src/index";

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
  console.log(user);
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
