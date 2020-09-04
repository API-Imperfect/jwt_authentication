import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entity/User";
import { RegistrationResponse } from "./RegistrationResponse";
import { RegistrationInput } from "./RegistrationInput";
import { sendEmail } from "../../../utils/sendEmail";
import { createConfirmationUrl } from "../../../utils/createConfrimationUrl";


@Resolver()
export class RegistrationResolvers {
    @Mutation(() => RegistrationResponse)
    async registerUser(
        @Arg("input")
        { firstName, lastName, email, password }: RegistrationInput
    ): Promise<RegistrationResponse> {
        try {
            const user=await User.create({
                firstName,
                lastName,
                email,
                password,
            }).save();

            //send confirmation email upon registration
            await sendEmail(email,await createConfirmationUrl(user.id))

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
