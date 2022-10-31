import {
  Resolver,
  Query,
  Mutation,
  Arg,
  //   ObjectType,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../utility/isAuth";
import { Comment } from "../entities/Comment";
import { Context } from "../types/Context";

@InputType()
class UpdateCommentInput {
  @Field()
  comment_text: string;

  //   @Field()
  //   @UpdateDateColumn()
  //   created_at: Date;
}

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
  @UseMiddleware(isAuth)
  async addComment(
    @Arg("pollId") pollId: number,
    @Arg("comment_text") comment_text: string,
    @Ctx() { payload }: Context
  ) {
    // Verify token and get payload
    try {
      const comment = Comment.create({
        pollId,
        userId: parseInt(payload!.userId),
        comment_text,
      }).save();
      return comment;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //   update comment text
  @Mutation(() => Comment)
  async updateComment(
    @Arg("id") id: number,
    @Arg("data") data: UpdateCommentInput
  ) {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) throw new Error("Comment not found!");
    Object.assign(comment, data);
    await comment.save();
    return comment;
  }

  //   delete comment
  @Mutation(() => Comment)
  async deleteComment(@Arg("id") id: number) {
    const data = await Comment.delete({ id });
    return data;
  }
}
