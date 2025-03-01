import { Module } from '@nestjs/common';
import { PulsarModule } from '@jobber/pulsar';
import { FibonacciConsumer } from './executors/fibonacci/fibonacci.consumer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PulsarModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [FibonacciConsumer],
})
export class AppModule {}
