import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize"
import { dbConfig } from "../config/db"

export interface IUser {
  id?: number
  password?: string
  provider?: string
  providerId?: string
  email: string
  ffsToken?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface UserModel extends Model<IUser>, IUser {}
// export class User extends Model<UserModel, IUser> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel
}

export function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    providerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ffsToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  })
}

export interface IWorker {
  id: number
  names: string
  age?: number
  scan?: number
  chssh?: number
  hansen?: number
  communicability?: number
  conflictability?: number
  traumas?: number
  speed?: number
  responsibility?: number
  endurance?: number
  accuracy?: number
  mobility?: number
  workExpirience?: number
  improvization?: number
  potential?: number
}
export interface WorkerModel extends Model<IWorker>, IWorker {}
// export class User extends Model<UserModel, IUser> {}

export type WorkerStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): WorkerModel
}

export function WorkerFactory(sequelize: Sequelize): WorkerStatic {
  return <WorkerStatic>sequelize.define("worker", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    scan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    chpssh: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hansen: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    communicability: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    conflictability: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    traumas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    responsibility: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    endurance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accuracy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mobility: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workExpirience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    improvization: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    potential: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  })
}

export const UserModels = UserFactory(dbConfig)
export const WorkerModels = WorkerFactory(dbConfig)
