import { Injectable } from "@nestjs/common";
import { CreateReportDto } from "./dtos/create-report.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {
  }

  async create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  };
}
