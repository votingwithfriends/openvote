import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Comment } from "./Comment";
import { Poll } from "./Poll";
import { Vote } from "./Choice-Vote";

// Define the user entity
@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @OneToMany(() => Comment, (comment) => comment.user) comments: Comment[];
  @OneToMany(() => Poll, (poll) => poll.user) polls: Poll[];
  @OneToMany(() => Vote, (vote) => vote.user) vote: Vote[];
}
