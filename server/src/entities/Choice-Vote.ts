import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
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

  @ManyToOne(() => User, (user) => user.vote) user: User;
  @ManyToOne(() => Choice, (choice) => choice.vote) choice: Choice;
}
