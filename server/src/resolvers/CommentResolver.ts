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
import { Comment } from "../entities/Comment";
// import { Context } from "../types/Context";
// import { sendRefreshToken } from "../utility/sendRefreshToken";
// import { verify } from "jsonwebtoken";

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
    @Arg("userId") userId: number,
    @Arg("comment_text") comment_text: string
  ) {
    const comment = Comment.create({
      pollId,
      userId,
      comment_text,
    }).save();
    return comment;
  }
}
