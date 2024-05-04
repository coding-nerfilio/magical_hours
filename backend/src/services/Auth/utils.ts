import { User } from "@src/entities/User";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export async function hashPassword(password: string) {
  try {
    // Generar un salt (valor aleatorio) para usar en el hash
    const salt = await bcrypt.genSalt(10); // El número 10 es el costo del cálculo del hash, cuanto más alto, más seguro pero más lento

    // Generar el hash de la contraseña usando el salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw error; // Manejar el error adecuadamente en tu aplicación
  }
}

export async function validatePassword(hash: string, password: string) {
  let result = false;

  try {
    result = await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
    throw "Error interno";
  }

  return result;
}

export function generateJWT(user: User) {
  // Define los datos que quieres incluir en el token
  const datosToken = {
    id: user.id,
    username: user.username,
    // Puedes agregar más datos según sea necesario
  };

  // Genera el token con los datos y una clave secreta
  const token = sign(datosToken, "tu_secreto", { expiresIn: "365d" }); // Reemplaza 'tu_secreto' con tu clave secreta real y define la expiración del token

  return token;
}
