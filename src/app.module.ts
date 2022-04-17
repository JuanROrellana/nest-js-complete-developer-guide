import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReportsModule } from "./reports/reports.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
const cookieSession = require('cookie-session');

@Module({
  imports: [ReportsModule, UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: "postgres",
    //       host: "localhost",
    //       port: 5432,
    //       username: "postgres",
    //       password: "postgres",
    //       database: config.get<string>("DB_NAME"),
    //       entities: [User, Report],
    //       synchronize: true
    //     };
    //   }
    // })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private configService: ConfigService) {
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    })).forRoutes("*");
  }
}
