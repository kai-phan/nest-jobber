import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from './model/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  getUsers(@CurrentUser() user: User) {
    console.log({ user });
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  getUserById(@Args('id') id: number) {
    return this.userService.getUserById(id);
  }
}
