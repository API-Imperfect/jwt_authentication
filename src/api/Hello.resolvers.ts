import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuthenticated";
import { MyContext } from "../MyContext";

@Resolver()
export class HelloResolvers {
    @Query(() => String)
    @UseMiddleware(isAuth)
    async hello(@Ctx() { payload }: MyContext) {
        console.log(payload);
        return `Your user id is ${payload!.userId} and email is ${
            payload!.email
        }`;
    }
}
