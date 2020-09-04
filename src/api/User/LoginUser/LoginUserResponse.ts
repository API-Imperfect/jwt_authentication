import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Log In response object" })
export class LoginUserResponse {
    @Field()
    ok: boolean;

    @Field(()=> String,{nullable:true})
    error: string | null;

    @Field(()=> String, {nullable:true})
    token: string | null;

}
