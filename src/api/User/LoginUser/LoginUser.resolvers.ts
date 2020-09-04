import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entity/User";
import { LoginUserResponse } from "./LoginUserResponse";
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from "../../../utils/createJWT";
import { MyContext } from "../../../MyContext";
import { LoginInput } from "./LoginInput";

@Resolver()
export class LoginUserResolvers {
    @Mutation(() => LoginUserResponse)
    async loginUser(
        @Arg("input") { email, password }: LoginInput,
        @Ctx() { res }: MyContext
    ): Promise<LoginUserResponse> {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return {
                    ok: false,
                    error: "Invalid Login credentials provided",
                    token: null,
                };
            }

            if (!user.confirmed) {
                return {
                    ok: false,
                    error: "Confirm your email first before logging in",
                    token: null,
                };
            }

            const checkPassword = await user.comparePassword(password);
            if (checkPassword) {
                const token = createAccessToken(user);

                //store token in cookie
                sendRefreshToken(res, createRefreshToken(user));

                return {
                    ok: true,
                    error: null,
                    token,
                };
            } else {
                return {
                    ok: false,
                    error: "Invalid Login credentials provided",
                    token: null,
                };
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message,
                token: null,
            };
        }
    }
}
