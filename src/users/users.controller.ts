import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session, UseGuards
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { CurrentUser } from "./decorators/current-user.decorator";
import { AuthGuard } from "../guards/auth.guard";

@Controller("auth")
@Serialize(UserDto)
export class UsersController {

  constructor(private userService: UsersService,
              private authService: AuthService) {
  }

  @Post('/signOut')
  signOut(@Session() session: any){
    session.userId = null;
  }

  @UseGuards(AuthGuard)
  @Get('/whoAmI')
  singUp(@CurrentUser() user: User){
    return user;
  }

  @Post("/signup")
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user =  await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post("/signIn")
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get("/:id")
  findUser(@Param("id") id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.userService.find(email);
  }

  @Patch("/:id")
  updatePartialUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
