//@ts-nocheck
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "@src/entities/User";

export enum HOUR_TYPE {
  MIRROR = "MIRROR",
  TRIANGLE = "TRIANGLE",
  REVERSE = "REVERSE",
}

@Entity()
export class HourEntry {
  @PrimaryColumn({ generated: true })
  id: number;

  @ManyToOne((): User => User)
  user: User;

  @Column()
  hour: string;

  @Column()
  type: HOUR_TYPE;
}
