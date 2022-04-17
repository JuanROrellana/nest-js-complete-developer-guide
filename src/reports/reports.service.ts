import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReportDto } from "./dtos/create-report.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import { GetEstimatesDto } from "./dtos/get-estimates.dto";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {
  }

  async create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  };

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException("Not Found Report");
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate({ make, model }: GetEstimatesDto) {
    return this.repo.createQueryBuilder()
      .select("*")
      .where("make = :make", { make })
      .andWhere("model = :model", { model })
      .getRawMany();
  }
}
