import { AppDataSource } from "../db/connection";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Choice } from "../entities/Poll-Choice";

@Resolver()
export class ChoiceResolver {
  // read all choices
  @Query(() => [Choice])
  choices() {
    return Choice.find();
  }

  // read one choice by id
  @Query(() => Choice)
  choice(@Arg("id") id: number) {
    return Choice.findOne({ where: { id: id } });
  }

  // Create a Choice
  @Mutation(() => Choice)
  async addChoice(@Arg("title") title: string, @Arg("pollId") pollId: number) {
    try {
      const choice = await Choice.create({ title, pollId }).save();

      return choice;
    } catch (err) {
      return console.error(err);
    }
  }

  // Update a choice
  @Mutation(() => Choice)
  async updateChoice(@Arg("id") id: number, @Arg("title") title: string) {
    try {
      const choice = await AppDataSource.createQueryBuilder()
        .update(Choice)
        .set({ title })
        .where("id = :choiceId", { choiceId: id })
        .execute();

      return choice;
    } catch (err) {
      return console.error(err);
    }
  }

  // Delete a choice
  // TODO: figure out suitable response
  @Mutation(() => Choice)
  async deleteChoice(@Arg("id") id: number) {
    try {
      const data = await Choice.delete({ id });

      return data;
    } catch (err) {
      return console.error(err);
    }
  }
}
