import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Choice } from "../entities/Poll-Choice";
// import { Context } from '../types/Context';

@Resolver()
export class ChoiceResolver {
  // get all choices
  @Query(() => [Choice])
  choices() {
    return Choice.find();
  }

  // get choice by id
  @Query(() => Choice)
  choice(@Arg("id") id: number) {
    return Choice.findOne({ where: { id: id } });
  }

  // Create a Choice
  @Mutation(() => Choice)
  async addChoice(@Arg("title") title: string) {
    const choice = Choice.create({ title }).save();
    return choice;
  }
}
