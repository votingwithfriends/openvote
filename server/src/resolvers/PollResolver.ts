import {
  Resolver,
  Query,
  Mutation,
  Arg,
  //   ObjectType,
  //   Field,
  Ctx,
} from "type-graphql";
// import { User } from "../entities/User";
import { Poll } from "../entities/Poll";
import { Context } from "../types/Context";
import { verify } from "jsonwebtoken";

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
    return Poll.findOne({
      where: { id },
      relations: ["comments.poll"],
    });
  }

  //   Mutations
  // add poll
  @Mutation(() => Poll)
  async addPoll(
    @Arg("is_open") is_open: boolean,
    @Arg("title") title: string,
    // get token information
    @Ctx() context: Context
  ) {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    // Verify token and get payload
    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      console.log(payload);
      const userId = payload.userId;
      //   create poll
      const poll = Poll.create({ is_open, title, userId }).save();
      return poll;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //   delete poll
  @Mutation(() => Poll)
  async deletePoll(@Arg("id") id: number) {
    const data = await Poll.delete({ id });
    return data;
  }
}
