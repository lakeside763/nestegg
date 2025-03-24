import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

export enum RoleType {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export interface ICreateCustomer {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface UserAttributes {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  hashed_password?: string;
  role: RoleType
  created_at?: Date;
  updated_at?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  declare id: string;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare role: RoleType;
  declare created_at: Date;
  declare hashed_password?: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(RoleType)),
      allowNull: false,
      defaultValue: RoleType.CUSTOMER
    }
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    underscored: true,
  }
);

export default User;