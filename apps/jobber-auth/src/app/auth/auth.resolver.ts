import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { User } from '../users/model/user.model';
import { GqlContext } from '@jobber/nestjs';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GqlContext,
  ) {
    return this.authService.login(loginInput, context.res);
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: GqlContext) {
    context.res.clearCookie('Authorization');
    return true;
  }
}
