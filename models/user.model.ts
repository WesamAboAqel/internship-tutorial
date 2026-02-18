import {
    Sequelize,
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "@sequelize/core";
import { attribute } from "@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/attribute.js";
import {
    Attribute,
    PrimaryKey,
    AutoIncrement,
    NotNull,
    Unique,
    Table,
    CreatedAt,
    UpdatedAt,
    Default,
    BeforeSave,
} from "@sequelize/core/decorators-legacy";
import Joi from "joi";
// import { SqliteDialect } from '@sequelize/sqlite3';

// const sequelize = new Sequelize({ dialect: SqliteDialect });

@Table({ tableName: "User" })
export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare firstName: string;

    @Attribute(DataTypes.STRING)
    declare lastName: string | null;

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    declare username: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare password: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    declare email: string;

    @Attribute(DataTypes.STRING)
    declare profilePicture: string;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    @Default(1)
    declare role: number;

    @CreatedAt
    @Default(new Date())
    declare createdAt?: Date;

    @UpdatedAt
    @Default(new Date())
    declare updatedAt?: Date;

    @BeforeSave
    static setUpdatedAt(user: User) {
        user.updatedAt = new Date();
    }
}

export interface IUserInit {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    fileName: string;
    role: number;
}

export const JUserInit = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    fileName: Joi.string(),
    role: Joi.number(),
});

export class UserResponseDTO {
    id!: number;
    firstName!: string;
    lastName!: string | null;
    username!: string;
    // password!: string;
    email!: string;
    profilePicture!: string;
    role!: number;
    // createdAt?: Date;
    // updatedAt?: Date;

    constructor(user: User) {
        this.id = user.id!;
        this.firstName = user.firstName;
        this.lastName = user.lastName ?? null;
        this.username = user.username;
        // this.password = user.password;
        this.email = user.email;
        this.profilePicture = user.profilePicture;
        this.role = user.role;
        // this.createdAt = user.createdAt;
        // this.updatedAt = user.updatedAt;
    }
}
