import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/jobber-auth';
import { hash } from 'bcryptjs';

@Injectable({})
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
    });
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async getUserById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async getUser(input: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({ where: input });
  }
}
