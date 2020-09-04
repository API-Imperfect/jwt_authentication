import { Arg, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../../entity/User";

@Resolver()
export class RevokeRefreshTokensResolvers {
    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("userId") userId: string) {
        await getConnection()
            .getRepository(User)
            .increment({ id: userId }, "tokenVersion", 1);
        return true
    }
}
