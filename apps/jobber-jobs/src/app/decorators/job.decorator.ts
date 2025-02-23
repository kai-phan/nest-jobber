import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';
import { JobMetadataInterface } from '../interfaces/job-metadata.interface';

export const JOB_METADATA_KEY = 'job_meta';

export const Job = (meta: JobMetadataInterface) => {
  return applyDecorators(SetMetadata(JOB_METADATA_KEY, meta), Injectable());
};
