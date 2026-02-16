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
} from "@sequelize/core/decorators-legacy";
// import { SqliteDialect } from '@sequelize/sqlite3';

// const sequelize = new Sequelize({ dialect: SqliteDialect });

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
}

export interface UserInit {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}
