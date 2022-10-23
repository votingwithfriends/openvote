import {
  Resolver,
  Query,
  Mutation,
  Arg,
  //   ObjectType,
  //   Field,
  //   Ctx,
} from "type-graphql";
// import { User } from "../entities/User";
import { Poll } from "../entities/Poll";
// import { Context } from "../types/Context";
// import { sendRefreshToken } from "../utility/sendRefreshToken";
// import { verify } from "jsonwebtoken";

// Poll Resolver
@Resolver()
export class PollResolver {
  // Queries
  // get all polls
  @Query(() => [Poll])
  polls() {
    return Poll.find();
  }

  //   get poll by id
  @Query(() => Poll)
  poll(@Arg("id") id: number) {
    return Poll.findOne({ where: { id: id } });
  }

  //   Mutations
  @Mutation(() => Poll)
  async addPoll(@Arg("is_open") is_open: boolean, @Arg("title") title: string) {
    const poll = Poll.create({ is_open, title }).save();
    return poll;
  }
}
