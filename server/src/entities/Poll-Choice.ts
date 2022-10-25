import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Poll } from "./Poll";
import { Vote } from "./Choice-Vote";

// Define the poll-choice entity
@ObjectType()
@Entity("choice")
export class Choice extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @ManyToOne(() => Poll, (poll) => poll.choice) poll: Poll;
  @OneToMany(() => Vote, (vote) => vote.choice) vote: Vote[];
}
