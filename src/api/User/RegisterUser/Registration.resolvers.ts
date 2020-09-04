import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entity/User";
import { RegistrationResponse } from "./RegistrationResponse";
import { RegistrationInput } from "./RegistrationInput";

@Resolver()
export class RegistrationResolvers {
    @Mutation(() => RegistrationResponse)
    async registerUser(
        @Arg("input") { email, password }: RegistrationInput
    ): Promise<RegistrationResponse> {
        try {
            await User.create({
                email,
                password,
            }).save();
            return {
                ok: true,
                error: null,
                token: null,
            };
        } catch (error) {
            return {
                ok: false,
                error: error.message,
                token: null,
            };
        }
    }
}
