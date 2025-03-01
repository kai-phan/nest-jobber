import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { JobModule } from './job.module';
import { PulsarModule } from '@jobber/pulsar';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JobModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      playground: {
        settings: {
          'schema.polling.enable': false,
          'request.credentials': 'include',
        },
      },
    }),
    PulsarModule,
  ],
})
export class AppModule {}
