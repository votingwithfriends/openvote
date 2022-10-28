import { Entity, BaseEntity, PrimaryColumn, ManyToMany } from "typeorm";
import { User } from "./User";
import { ObjectType, Field } from "type-graphql";

// Define the user entity
@ObjectType()
@Entity("friendship")
export class Friendship extends BaseEntity {
  @Field(() => User)
  @PrimaryColumn()
  @ManyToMany(() => User, (user) => user.id)
  sourceId: number;

  @Field(() => User)
  @PrimaryColumn()
  @ManyToMany(() => User, (user) => user.id)
  targetId: number;
}
