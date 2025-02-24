import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GrpcAuthGuard } from '@jobber/nestjs';

import { Job } from './models/job.model';
import { JobService } from './job.service';
import { JobInput } from './dto/job.input';

@Resolver()
@UseGuards(GrpcAuthGuard)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Query(() => [Job], { name: 'jobs' })
  async getJobs() {
    return this.jobService.getJobs();
  }

  @Mutation(() => Job)
  async executeJob(@Args('jobInput') jobInput: JobInput) {
    return this.jobService.executeJob(jobInput.name);
  }
}
