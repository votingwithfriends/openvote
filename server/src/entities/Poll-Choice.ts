import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
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

  @Field()
  @Column({ nullable: true })
  @JoinColumn({ name: "pollId" })
  pollId: number;
  @ManyToOne(() => Poll, (poll) => poll.choices, { onDelete: "CASCADE" })
  poll: Poll;

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.choice)
  votes: Vote[];
}
