import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  email!: string;

  @Field({ nullable: true })
  name!: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;
}

