import { Module } from '@nestjs/common';
import { PulsarService } from './pulsar.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [PulsarService, ConfigService],
  exports: [PulsarService],
})
export class PulsarModule {}
