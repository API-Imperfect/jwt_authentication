import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "User Registration response object" })
export class RegistrationResponse {
    @Field()
    ok: boolean;

    @Field(()=> String,{nullable:true})
    error: string | null;

    @Field(()=> String, {nullable:true})
    token: string | null;

}

