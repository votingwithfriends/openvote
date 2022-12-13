import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./User";
import { Choice } from "./Poll-Choice";

// define the choice-vote entity
@ObjectType()
@Entity("vote")
export class Vote extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  value: number;

  @Field()
  @Column()
  @JoinColumn({ name: "userId" })
  userId: number;
  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @Field()
  @Column({ nullable: true })
  @JoinColumn({ name: "choiceId" })
  choiceId: number;
  @ManyToOne(() => Choice, (choice) => choice.votes, {
    onDelete: "CASCADE",
  })
  choice: Choice;
}
