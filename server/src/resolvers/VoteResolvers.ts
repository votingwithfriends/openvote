import { Vote } from "../entities/Choice-Vote";
import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { AppDataSource } from "../db/connection";

@Resolver()
export class VoteResolver {
  // get all votes
  @Query(() => [Vote])
  votes() {
    return Vote.find();
  }

  // get vote by id
  @Query(() => Vote)
  vote(@Arg("id") id: number) {
    return Vote.findOne({ where: { id: id } });
  }

  // Create a vote
  @Mutation(() => Vote)
  async addVote(
    @Arg("value") value: number,
    @Arg("userId") userId: number,
    @Arg("choiceId") choiceId: number
  ) {
    try {
      const vote = await Vote.create({ value, userId, choiceId }).save();
      return vote;
    } catch (err) {
      return console.error(err);
    }
  }

  // Update a vote
  @Mutation(() => Vote)
  async updateVote(@Arg("id") id: number, @Arg("value") value: number) {
    try {
      const vote = await AppDataSource.createQueryBuilder()
        .update(Vote)
        .set({ value })
        .where("id = :voteId", { voteId: id })
        .execute();
      return vote;
    } catch (err) {
      return console.error(err);
    }
  }

  // Delete a vote
  @Mutation(() => Vote)
  async deleteVote(@Arg("id") id: number) {
    try {
      const vote = await Vote.delete({ id });
      return vote;
    } catch (err) {
      return console.error(err);
    }
  }
}
