import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(this);
  }

  @AfterUpdate()
  updateUser() {
    console.log(this);
  }

  @AfterRemove()
  afterRemove() {
    console.log(this);
  }
}
