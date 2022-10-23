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
import { User } from "./User";
import { Comment } from "./Comment";

//   Define Poll entity
@ObjectType()
@Entity("poll")
export class Poll extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  is_open: boolean;
  default: true;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({
    nullable: true,
  })
  userId: number;
  @ManyToOne(() => User, (user) => user.polls)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.poll) comments: Comment[];
}
