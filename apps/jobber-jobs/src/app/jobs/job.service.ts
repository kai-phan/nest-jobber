import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import {
  DiscoveryService,
  DiscoveredClassWithMeta,
} from '@golevelup/nestjs-discovery';

import { AbstractJob } from './abstract.job';
import { JOB_METADATA_KEY } from '../decorators/job.decorator';
import { JobMetadataInterface } from '../interfaces/job-metadata.interface';

@Injectable()
export class JobService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadataInterface>[] = [];

  constructor(private readonly discoveryService: DiscoveryService) {}

  async getJobs() {
    return this.jobs.map((j) => j.meta);
  }

  async onModuleInit() {
    this.jobs =
      await this.discoveryService.providersWithMetaAtKey<JobMetadataInterface>(
        JOB_METADATA_KEY,
      );
  }

  async executeJob(name: string) {
    const job = this.jobs.find((j) => j.meta.name === name);
    if (!job) {
      throw new BadRequestException(`Job ${name} not found`);
    }

    await (job.discoveredClass.instance as AbstractJob).execute();

    return job;
  }
}
