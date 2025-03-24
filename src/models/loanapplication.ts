import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import User from "./user";

export enum LoanApplicationStatus {
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  DISBURSED = 'disbursed',
  PAID = 'paid',
  DEFAULTED = 'defaulted',
}

export interface ICreateLoanApplication {
  customer_id: string;
  amount: number;
  term_months: number;
}

interface LoanApplicationAttributes {
  id?: string;
  customer_id: string;
  amount: number;
  term_months: number;
  annual_interest_rate: number;
  monthly_repayment: number;
  monthly_interest_rate: number;
  monthly_interest: number;
  status?: LoanApplicationStatus;
  customer?: User;
  created_at?: Date;
  updated_at?: Date;
}

class LoanApplication extends Model<LoanApplicationAttributes> implements LoanApplicationAttributes {
  declare id: string;
  declare customer_id: string;
  declare amount: number;
  declare term_months: number;
  declare annual_interest_rate: number;
  declare monthly_repayment: number;
  declare monthly_interest_rate: number;
  declare monthly_interest: number;
  declare status: LoanApplicationStatus;
  declare customer: User;
  declare created_at: Date;
  declare updated_at: Date;
}

LoanApplication.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    term_months: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    annual_interest_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    monthly_repayment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monthly_interest_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    monthly_interest: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(LoanApplicationStatus)),
      allowNull: false,
      defaultValue: LoanApplicationStatus.PENDING_APPROVAL,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'loan_applications',
    modelName: 'LoanApplication',
    timestamps: false,
    underscored: true,
  }
);

LoanApplication.belongsTo(User, { foreignKey: 'customer_id', as: 'customer' });

export default LoanApplication;
