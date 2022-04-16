import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReportsModule } from "./reports/reports.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ReportsModule, UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "postgres",
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true
        };
      }
    })
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'stripe-example',
    //   entities: [User, Report],
    //   synchronize: true,
    // })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
