import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      playground: {
        settings: {
          'schema.polling.enable': false,
          'request.credentials': 'include',
        },
      },
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
