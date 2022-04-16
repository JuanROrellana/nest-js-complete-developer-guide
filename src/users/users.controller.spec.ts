import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { find } from "rxjs";

describe("UsersController", () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      async findOne(id: number) {
        return Promise.resolve({ id, email: "admin@admin.com", password: "password" } as User);
      },
      async find(email: string) {
        return Promise.resolve([{
          id: 12,
          email,
          password: "password"
        } as User]);
      }
    };

    fakeAuthService = {
      // async signUp(email: string, password: string): Promise<User> {
      // },
      // async signIn(email: string, password: string): Promise<User> {
      // }
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findAllUsers returns a list of users with the given email", async () => {
    const users = await controller.findAllUsers("admin@admin.com");
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual("admin@admin.com");
  });

  it("findOne ", async () => {
    const user = await controller.findUser("1");
    expect(user).toBeDefined();
  });

  it("should find user throw error if the id is not found", async () => {
    fakeUsersService.find = () => null;
    try {
      await controller.findUser("1");
    } catch (error) {
    }
  });


});
