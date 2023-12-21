import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum ExampleStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

@Entity()
export class Sample {
  // uuid generation
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "int",
    generated: "increment",
  })
  sno: number;

  // Composite Keys example below

  // @PrimaryColumn()
  // compositeKeyOne: number;

  // @PrimaryColumn()
  // compositeKeyTwo: number;

  // @PrimaryColumn()
  // compositeKeyThree: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  approval: boolean;

  @Column({
    type: "enum",
    enum: ExampleStatus,
    default: ExampleStatus.PENDING,
  })
  status: ExampleStatus;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
