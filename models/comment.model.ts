import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "@sequelize/core";

import {
    Attribute,
    PrimaryKey,
    AutoIncrement,
    NotNull,
    Table,
    CreatedAt,
    UpdatedAt,
    Default,
    BeforeSave,
    BelongsTo,
    HasMany,
} from "@sequelize/core/decorators-legacy";
import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import { Post } from "./post.model.js";

@Table({ tableName: "Comment" })
export class Comment extends Model<
    InferAttributes<Comment>,
    InferCreationAttributes<Comment>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.TEXT)
    @NotNull
    declare content: string;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare user_id: number;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare post_id: number;

    @Attribute(DataTypes.INTEGER)
    declare parent_id?: number | null;

    @CreatedAt
    @Default(new Date())
    declare createdAt?: Date;

    @UpdatedAt
    @Default(new Date())
    declare updatedAt?: Date;

    @BelongsTo(() => User, "user_id")
    declare user?: User;

    @BelongsTo(() => Post, "post_id")
    declare post?: Post;

    declare parent?: Comment;

    @HasMany(() => Comment, {
        foreignKey: "parent_id",
        inverse: {
            as: "parent",
        },
    })
    declare replies?: Comment[];

    @BeforeSave
    static setUpdatedAt(comment: Comment) {
        comment.updatedAt = new Date();
    }

    // @BeforeCreate
    // static async encryptPassword(user: User) {
    //     user.password = await bcrypt.hash(user.password, 10);
    // }
}

export interface ICommentInit {
    content: string;
    user_id: number;
    post_id: number;
    parent_id?: number | null;
}

export const JCommentInit = Joi.object({
    content: Joi.string().required(),
    user_id: Joi.number().required(),
    post_id: Joi.number().required(),
    parent_id: Joi.number().allow(null),
});

// export class UserResponseDTO {
//     id!: number;
//     firstName!: string;
//     lastName!: string | null;
//     username!: string;
//     // password!: string;
//     email!: string;
//     profilePicture!: string;
//     role!: number;
//     // createdAt?: Date;
//     // updatedAt?: Date;

//     constructor(user: User) {
//         this.id = user.id!;
//         this.firstName = user.firstName;
//         this.lastName = user.lastName ?? null;
//         this.username = user.username;
//         // this.password = user.password;
//         this.email = user.email;
//         this.profilePicture = user.profilePicture;
//         this.role = user.role;
//         // this.createdAt = user.createdAt;
//         // this.updatedAt = user.updatedAt;
//     }
// }
