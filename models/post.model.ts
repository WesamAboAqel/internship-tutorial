import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "@sequelize/core";

import { Sequelize } from "@sequelize/core";
import {
    BelongsTo,
    Attribute,
    PrimaryKey,
    AutoIncrement,
    NotNull,
    // ForeignKey,
} from "@sequelize/core/decorators-legacy";

import Joi from "joi";
import { User } from "./user.model.js";

export class Post extends Model<
    InferAttributes<Post>,
    InferCreationAttributes<Post>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare title: String;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare description: string;

    // @ForeignKey(() => User)
    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare user_id: number;

    @BelongsTo(() => User, "userId")
    declare user: User;
}
