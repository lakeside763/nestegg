// @ts-nocheck
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, DataTypes, Model } from 'sequelize';
import process from 'process';
import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? '.env.local' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../config/database/index.js')[env];

interface SequelizeModel extends Model {
  associate?: (db: DbInterface) => void;
  init: (sequelize: Sequelize, DataTypes: typeof DataTypes) => void;
}

interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: SequelizeModel | Sequelize | typeof Sequelize;
}

const db: DbInterface = {} as DbInterface;

let sequelize: Sequelize;

if (config.use_env_variable) {
  const envVariable = process.env[config.use_env_variable];
  if (!envVariable) {
    throw new Error(`Environment variable ${config.use_env_variable} is not defined`);
  }
  sequelize = new Sequelize(envVariable, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamically load other models
// eslint-disable-next-line security/detect-object-injection
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts';
  })
  .forEach(async (file) => {
    const model = await import(path.join(__dirname, file));
    if (model && model.init) {
      model.init(sequelize, DataTypes);
      // eslint-disable-next-line security/detect-object-injection
      db[model.name] = model;
    }
  });

// eslint-disable-next-line security/detect-object-injection
Object.keys(db).forEach((modelName) => {
  // eslint-disable-next-line security/detect-object-injection
  const model = db[modelName] as SequelizeModel;
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { db, sequelize };
