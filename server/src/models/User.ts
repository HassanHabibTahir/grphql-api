import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id?: number;

  @Field()
  email?: string;

  @Field({ nullable: true })
  name?: string;
}
