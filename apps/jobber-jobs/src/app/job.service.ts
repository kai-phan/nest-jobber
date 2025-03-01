import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import {
  DiscoveryService,
  DiscoveredClassWithMeta,
} from '@golevelup/nestjs-discovery';

import { AbstractJob } from './jobs/abstract.job';
import { JOB_METADATA_KEY } from './decorators/job.decorator';
import { JobMetadataInterface } from './interfaces/job-metadata.interface';

@Injectable()
export class JobService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadataInterface>[] = [];

  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    this.jobs =
      await this.discoveryService.providersWithMetaAtKey<JobMetadataInterface>(
        JOB_METADATA_KEY,
      );
  }

  async getJobs() {
    return this.jobs.map((j) => j.meta);
  }

  async executeJob(name: string, data: object) {
    const job = this.jobs.find((j) => j.meta.name === name);
    if (!job) {
      throw new BadRequestException(`Job ${name} not found`);
    }

    if (!(job.discoveredClass.instance instanceof AbstractJob)) {
      throw new InternalServerErrorException(
        `Job ${name} is not an instance of AbstractJob`,
      );
    }

    await job.discoveredClass.instance.validate(data);
    await job.discoveredClass.instance.execute(name, data);

    return job.meta;
  }
}
