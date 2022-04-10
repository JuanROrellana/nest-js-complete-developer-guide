import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";


@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {
  }

  async signUp(email: string, password: string) {
    const user = await this.userService.find(email);
    if (user.length) {
      throw new BadRequestException("Email is already use");
    }

    //Hash User password
    return await this.userService.create(email, password);
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException("User not Found");
    }

    if (user.password != password){
      throw new NotFoundException("Wrong Password");
    }

    return user;
  }
}
