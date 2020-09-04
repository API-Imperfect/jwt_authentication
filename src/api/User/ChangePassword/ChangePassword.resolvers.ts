import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { ChangePasswordInput } from "./ChangePasswordInput";
import { redis } from "../../../redis";
import { User } from "../../../entity/User";

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("input") { token, password }: ChangePasswordInput
    ): Promise<User | null> {
        const userId = await redis.get(token);

        if (!userId) {
            return null;
        }

        const user = await User.findOne(userId);

        if (!user) {
            return null;
        }

        await redis.del(token);

        user.password = await bcrypt.hash(password, 12);

        await user.save();

        return user;
    }
}
