import {
  Resolver,
  Mutation,
  Arg,
  Query,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { isAuth } from "../utility/isAuth";
import { User } from "../entities/User";
import { Friendship } from "../entities/Friendship";
import { AppDataSource } from "../db/connection";
import { Context } from "../types/Context";

@Resolver()
export class FriendResolver {
  // Get friends by sourceId
  @Query(() => [User])
  getFriendsBySourceId(@Arg("sourceId") sourceId: number): Promise<User[]> {
    return AppDataSource.getRepository(Friendship).query(
      `
      SELECT p.username, p.email 
      FROM user p INNER JOIN friendship f on f.targetId = p.id 
      WHERE f.sourceId = ${sourceId};
      `
    );
  }

  // Add friend
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addFriend(
    @Arg("targetId") targetId: number,
    @Ctx() { payload }: Context
  ): Promise<Boolean> {
    // Check if target user exists
    const target = await User.findOne({ where: { id: targetId } });
    if (!target) {
      throw new Error("Target user does not exist");
    }
    const friend = Friendship.create({
      sourceId: parseInt(payload!.userId),
      targetId,
    });
    if (!friend) {
      throw new Error("Error adding friend");
    }
    await friend.save();
    return true;
  }
}
