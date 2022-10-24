import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Poll } from "./Poll";
import { User } from "./User";

//   Define Poll entity
@ObjectType()
@Entity("comment")
export class Comment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  comment_text: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.comments) user: User;
  @ManyToOne(() => Poll, (poll) => poll.comments) poll: Poll;
}