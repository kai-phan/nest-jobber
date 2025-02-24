import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { JobModule } from './jobs/job.module';

@Module({
  imports: [
    ConfigModule,
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
  ],
})
export class AppModule {}
