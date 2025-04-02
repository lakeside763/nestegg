require('dotenv').config();

console.log("TEST_DATABASE_URL:", process.env.TEST_DATABASE_URL);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
    modelsDir: 'src/models',
    migrationsDir: 'src/migrations',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    use_env_variable: "TEST_DATABASE_URL", // Use TEST_DATABASE_URL instead
    dialect: "postgres",
    logging: false,
    migrationStorageTableName: 'sequelize_meta',
    modelsDir: 'src/models',
    migrationsDir: 'src/migrations',
  },
};
