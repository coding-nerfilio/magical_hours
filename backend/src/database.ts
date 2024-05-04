import { DataSource } from "typeorm";
import { User } from "@src/entities/User";
import { HourEntry } from "@src/entities/HourEntry";

export const initializeDatabase = async () => {
  const datasource = new DataSource({
    database: process.env.MAGICAL_HOURS_TYPEORM_DATABASE,
    port: Number(process.env.MAGICAL_HOURS_TYPEORM_PORT),
    type: "postgres" as any,
    host: process.env.MAGICAL_HOURS_TYPEORM_HOST,
    username: process.env.MAGICAL_HOURS_TYPEORM_USERNAME,
    password: process.env.MAGICAL_HOURS_TYPEORM_PASSWORD,
    poolSize: 10,
    synchronize: true,
    entities: [User, HourEntry],
    logging: new Boolean(
      process.env.MAGICAL_HOURS_DATABASE_LOG
    ).valueOf() as any,
  });

  await datasource.initialize();

  return datasource;
};
