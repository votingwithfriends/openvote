import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

// Define the poll-choice entity
@ObjectType()
@Entity("choice")
export class Choice extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  poll_id: number;

  @Field()
  @Column()
  title: string;
}
