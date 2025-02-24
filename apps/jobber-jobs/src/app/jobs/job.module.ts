import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { FibonacciJob } from './fibonacci.job';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth';
import { join } from 'node:path';

@Module({
  imports: [
    DiscoveryModule,
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/auth.proto'),
        },
      },
    ]),
  ],
  providers: [JobService, JobResolver, FibonacciJob],
})
export class JobModule {}
