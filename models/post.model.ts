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
    Table,
    CreatedAt,
    UpdatedAt,
    Default,
    BeforeSave,
} from "@sequelize/core/decorators-legacy";

import Joi from "joi";
import { User } from "./user.model.js";

@Table({ tableName: "Post" })
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

    @BelongsTo(() => User, "user_id")
    declare user?: User;

    @CreatedAt
    @Default(new Date())
    declare createdAt?: Date;

    @UpdatedAt
    @Default(new Date())
    declare updatedAt?: Date;

    @BeforeSave
    static setUpdatedAt(post: Post) {
        post.updatedAt = new Date();
    }
}

export interface IPostInit {
    title: string;
    description: string;
    user_id: number;
}

export interface IPostEdit {
    id: number;
    title?: string;
    description?: string;
}

export const JPostInit = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    user_id: Joi.number().required(),
});

export const JPostEdit = Joi.object({
    id: Joi.number(),
    title: Joi.string(),
    description: Joi.string(),
});
