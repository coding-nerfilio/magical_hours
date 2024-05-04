//@ts-nocheck
import "reflect-metadata";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn({ generated: true })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];
}
