import { Arg, Mutation, Resolver } from "type-graphql";
import { sendEmail } from "../../../utils/sendEmail";
import { v4 } from "uuid";
import { redis } from "../../../redis";
import { User } from "../../../entity/User";

@Resolver()
export class ForgotPasswordResolvers {
    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("that email is invalid");
        }

        const token = v4();
        await redis.set(token, user.id, "ex", 60 * 60 * 24); // 1 day
        // expiration

        await sendEmail(
            email,
            `http://localhost:3000/user/change-password/${token}`
        );

        return true;
    }
}
