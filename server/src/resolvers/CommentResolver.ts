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
import { Comment } from "../entities/Comment";
import { Context } from "../types/Context";
// import { sendRefreshToken } from "../utility/sendRefreshToken";
import { verify } from "jsonwebtoken";

//   Comment Resolver
@Resolver()
export class CommentResolver {
  // QUERIES
  // get all comments
  @Query(() => [Comment])
  comments() {
    return Comment.find();
  }

  //   MUTATIONS
  //   create a comment
  @Mutation(() => Comment)
  async addComment(
    @Arg("pollId") pollId: number,
    @Arg("comment_text") comment_text: string,
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
      const comment = Comment.create({
        pollId,
        userId,
        comment_text,
      }).save();
      return comment;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //   delete comment
  @Mutation(() => Comment)
  async deleteComment(@Arg("id") id: number) {
    const data = await Comment.delete({ id });
    return data;
  }
}
