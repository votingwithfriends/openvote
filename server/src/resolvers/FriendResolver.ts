import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "../entities/User";
import { Friendship } from "../entities/Friendship";
import { AppDataSource } from "../db/connection";

@Resolver()
export class FriendResolver {
  // Get friends by sourceId
  @Query(() => [User])
  getFriendsBySourceId(@Arg("sourceId") sourceId: number): Promise<User[]> {
    return AppDataSource.getRepository(Friendship).query(
      `
      SELECT p.username, p.email 
      FROM user p INNER JOIN friendship f on f.targetId = p.id 
      WHERE f.sourceId = sourceId;
      `,
      [sourceId]
    );
  }

  // Add friend
  // TODO - Only users who are logged in can add others as friends
  @Mutation(() => Boolean)
  async addFriend(
    @Arg("sourceId") sourceId: number,
    @Arg("targetId") targetId: number
  ): Promise<Boolean> {
    // Check if target user exists
    const target = await User.findOne({ where: { id: targetId } });
    if (!target) {
      throw new Error("Target user does not exist");
    }
    const friend = Friendship.create({
      sourceId,
      targetId,
    });
    if (!friend) {
      throw new Error("Error adding friend");
    }
    await friend.save();
    return true;
  }
}
