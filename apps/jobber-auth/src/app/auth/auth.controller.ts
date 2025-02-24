import { Controller, UseGuards } from '@nestjs/common';
import {
  AuthRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
} from 'types/proto/auth';
import { UserService } from '../users/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  authenticate(request: AuthRequest & { user: { userId: number } }) {
    return this.userService.getUserById(request.user.userId);
  }
}
