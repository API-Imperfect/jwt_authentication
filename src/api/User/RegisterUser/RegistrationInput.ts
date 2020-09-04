import { Field, InputType } from "type-graphql";
import { IsEmail, Length, MinLength } from "class-validator";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist";

@InputType()
export class RegistrationInput {
    @Field() @Length(1, 30) firstName: string;

    @Field() @Length(1, 30) lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "email already in use" })
    email: string;

    @Field() @MinLength(6) password: string;
}
