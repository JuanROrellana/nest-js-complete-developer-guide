var dbConfig = {
  migrations: ["**/migrations/*.js"],
  // migrations: ["dist/migrations/*{.js,.ts}"],
  cli: {
    migrationsDir: "migrations"
  },
};

switch (process.env.NODE_ENV) {
  case "development":
    Object.assign(dbConfig, {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "nest-complete",
      entities: ["**/*.entity.js"],
      synchronize: false
    });
    break;
  case "test":
    Object.assign(dbConfig, {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "nest-complete",
      entities: ["**/*.entity.ts"],
      synchronize: false
    });
  case "production":
    break;
  default:
    throw new Error("Unknow env");
}

module.exports = dbConfig;
