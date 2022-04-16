import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = { id: Math.floor(Math.random() * 9000), email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      }
    };

    const module = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService
        }]
    }).compile();

    service = module.get(AuthService);
  });

  it(`can create an instance of auth service`, async () => {
    expect(service).toBeDefined();
  });

  it("should create a new User", async () => {
    const user = await service.signUp("admin@admin.com", "password");
    expect(user.password).toEqual("password");
    expect(user.email).toEqual("admin@admin.com");
  });

  it("should throw an error if the user signs with existing email", async () => {
    await service.signUp("admin@admin.com", "password");
    try {
      await service.signUp("admin@admin.com", "password");
    } catch (err) {
    }
  });

  it("should throw if signIn is calle on unused email", async () => {
    try {
      await service.signIn("asdad@adasd.com", "asdasd");
    } catch (err) {
    }
  });

  it("it return an user if correct password is provided", async () => {
    await service.signUp("admin@admin", "password");
    const user = await service.signIn("admin@admin", "password");
    expect(user).toBeDefined();
  });


});
