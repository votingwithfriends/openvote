import { Vote } from "../entities/Choice-Vote";
import { Arg, Query, Resolver } from "type-graphql";

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

  // create a vote
  // @Mutation(() => Choice)
}
