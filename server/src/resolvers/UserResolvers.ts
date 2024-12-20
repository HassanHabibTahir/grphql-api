import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../models/User";

import { PrismaClient } from "@prisma/client";
import { CreateUserInput, UpdateUserInput } from "../inputs/userInputs";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { prisma }: { prisma: PrismaClient }) {
    return prisma.user.findMany();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: number, @Ctx() { prisma }: { prisma: PrismaClient }) {
    return prisma.user.findUnique({ where: { id } });
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data") data: CreateUserInput,
    @Ctx() { prisma }: { prisma: PrismaClient }
  ) {
    console.log(data?.email,"email")
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name || null, 
      },
    });
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("data") data: UpdateUserInput,
    @Ctx() { prisma }: { prisma: PrismaClient }
  ) {
    return prisma.user.update({ where: { id }, data });
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: number, @Ctx() { prisma }: { prisma: PrismaClient }) {
    return prisma.user.delete({ where: { id } });
  }
}



