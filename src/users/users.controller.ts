import { Body, Controller, Get, Param, Patch, Post, Query, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";

@Serialize(UserDto)
@Controller("auth")
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Get("/:id")
  findUser(@Param("id") id: string) {
    console.log('handler running');
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
