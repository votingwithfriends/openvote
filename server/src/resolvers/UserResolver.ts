import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import { User } from "../entities/User";
import { hash, compare } from "bcrypt";
import { Context } from "../types/Context";
import { sendRefreshToken } from "../utility/sendRefreshToken";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../auth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

// User Resolver
@Resolver()
export class UserResolver {
  // Get all users
  @Query(() => [User])
  users() {
    return User.find();
  }

  // Get single user by ID
  @Query(() => User)
  user(@Arg("id") id: number) {
    return User.findOne({ where: { id: id } });
  }

  // Get current user
  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    // Verify token and get payload
    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      console.log(payload);
      return User.findOne({ where: { id: payload.userId } });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Create new user
  @Mutation(() => User)
  async register(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    // Hash user password
    const hashedPw = await hash(password, 10);
    const user = User.create({
      username,
      email,
      password: hashedPw,
    }).save();

    return user;
  }

  // Login a user
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Incorrect Email or Password");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect Email or Password");
    }

    sendRefreshToken(res, createRefreshToken(user));
    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  // Logout a user
  @Mutation(() => String)
  async logout(@Ctx() { res }: Context): Promise<String> {
    sendRefreshToken(res, "");
    return "User successfully logged out";
  }
}
