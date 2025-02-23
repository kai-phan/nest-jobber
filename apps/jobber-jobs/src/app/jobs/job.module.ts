import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { FibonacciJob } from './fibonacci.job';

@Module({
  imports: [DiscoveryModule],
  providers: [JobService, JobResolver, FibonacciJob],
})
export class JobModule {}
