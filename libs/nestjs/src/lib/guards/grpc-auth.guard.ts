import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from 'types/proto/auth';
import { catchError, map, of, Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class GrpcAuthGuard implements CanActivate, OnModuleInit {
  private readonly logger = new Logger(GrpcAuthGuard.name);
  private authGrpcClient: AuthServiceClient;

  constructor(
    @Inject(AUTH_PACKAGE_NAME)
    private readonly clientGrpc: ClientGrpc,
  ) {}

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const request = this.getRequest(context);
    const token = request.cookies?.Authorization;

    if (!token) return false;

    return this.authGrpcClient.authenticate({ token }).pipe(
      map((res) => {
        return true;
      }),
      catchError((err) => {
        return of(false);
      }),
    );
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  onModuleInit() {
    this.authGrpcClient = this.clientGrpc.getService(AUTH_SERVICE_NAME);
  }
}
