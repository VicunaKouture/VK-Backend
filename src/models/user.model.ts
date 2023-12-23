import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export enum UserRole {
  CUSTOMER = "customer",
  DESIGNER = "designer",
}

@Entity("users")
export class User extends BaseEntity {
  // uuid generation
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryColumn({
    unique: true,
  })
  email: string;

  @Column({})
  name: string;

  @Column({})
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
