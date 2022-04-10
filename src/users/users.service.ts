import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.repo.findOne(id);
    if (!user) {
      return new NotFoundException("User not Found");
    }
    return user;
  }

  async find(email: string) {
    return this.repo.find({ email: email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
}
