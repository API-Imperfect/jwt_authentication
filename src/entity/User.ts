import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import bcrypt from "bcryptjs";
import { IsEmail } from "class-validator";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => ID) @PrimaryGeneratedColumn("uuid") id: string;

    @Field() @IsEmail() @Column("text") email: string;

    @Column("text") password: string;

    @Column("int",{default:0}) tokenVersion: number;


    private static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    public comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword(): Promise<void> {
        if (this.password) {
            this.password = await User.hashPassword(this.password);
        }
    }
}
