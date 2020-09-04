import { Query, Resolver } from "type-graphql";
import { User } from "../../../entity/User";

@Resolver()
export class GetUsersResolvers {
    @Query(() => [User])
    async users() {
        return await User.find();
    }
}
