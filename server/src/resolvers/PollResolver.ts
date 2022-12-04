import { AppDataSource } from "../db/connection";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  //   ObjectType,
  Field,
  InputType,
  // Ctx,
  // UseMiddleware,
} from "type-graphql";
import { Poll } from "../entities/Poll";
// import { Context } from "../types/Context";
// import { isAuth } from "../utility/isAuth";

@InputType()
class UpdatePollInput {
  @Field()
  title: string;

  @Field()
  is_open: boolean;

  //   @Field()
  //   @UpdateDateColumn()
  //   created_at: Date;
}

// Poll Resolver
@Resolver()
export class PollResolver {
  // Queries
  // get all polls
  @Query(() => [Poll])
  polls() {
    return Poll.find({
      relations: ["comments", "choices"],
    });
  }

  //   get poll by id
  @Query(() => Poll)
  poll(@Arg("id") id: number) {
    return Poll.findOne({
      relations: ["comments", "choices"],
      where: { id },
    });
  }

  // Poll by user (Temp)
  // Delete once relationship has been fixed with User
  @Query(() => [Poll], { nullable: true })
  async pollByUser(@Arg("userId") userId: number) {
    const polls = await Poll.find({ where: { userId } });
    if (!polls) {
      return null;
    }
    return polls;
  }

  // get poll with choices
  @Query(() => Poll)
  getPollAndChoices(@Arg("id") id: number) {
    return AppDataSource.getRepository(Poll)
      .createQueryBuilder("p")
      .leftJoinAndSelect("p.choices", "c")
      .where("p.id = :pollId", { pollId: id })
      .getOne();
  }

  //   Mutations
  // add poll
  @Mutation(() => Poll)
  // @UseMiddleware(isAuth)
  async addPoll(
    @Arg("is_open") is_open: boolean,
    @Arg("title") title: string,
    @Arg("userId") userId: number
    // get token information
    // @Ctx() { payload }: Context
  ) {
    try {
      //   create poll
      const poll = Poll.create({
        is_open,
        title,
        userId,
        // parseInt(payload!.userId),
      }).save();
      return poll;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //   update poll title
  @Mutation(() => Poll)
  async updatePoll(@Arg("id") id: number, @Arg("data") data: UpdatePollInput) {
    const poll = await Poll.findOne({
      where: { id },
      relations: ["comments.poll"],
    });
    if (!poll) throw new Error("Poll not found!");
    Object.assign(poll, data);
    await poll.save();
    return poll;
  }

  //   delete poll
  @Mutation(() => Poll)
  async deletePoll(@Arg("id") id: number) {
    const data = await Poll.delete({ id });
    return data;
  }
}
