import { verify } from "jsonwebtoken";

const validateJWT = (req: any, res: any, next: any) => {
  console.log(req.headers);
  const token = req.headers["authorization"];

  // Verificar si el token está presente
  if (!token) {
    return res
      .status(401)
      .json({ mensaje: "Token de autorización no proporcionado" });
  }

  try {
    // Verificar el token y obtener los datos del usuario
    const decoded: any = verify(token, "tu_secreto"); // Reemplaza 'tu_secreto' con tu clave secreta real

    // Adjuntar los datos del usuario al objeto de solicitud (req) para que estén disponibles en las rutas posteriores
    (req as any).user = decoded;

    // Llamar a next() para pasar al siguiente middleware o a la ruta
    next();
  } catch (error) {
    // Manejar errores de token inválido
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};

export const Middleware = { validateJWT };
