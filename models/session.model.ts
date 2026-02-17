import {
    Sequelize,
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
    BelongsTo,
    BeforeCreate,
    Default,
    Table,
} from "@sequelize/core/decorators-legacy";
import bcrypt from "bcrypt";
import { User } from "./user.model.js";

@Table({ tableName: "Sessions" })
export class Session extends Model<
    InferAttributes<Session>,
    InferCreationAttributes<Session>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare user_id: number;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare refreshTokenHash: string;

    @Attribute(DataTypes.DATE)
    @NotNull
    @Default(new Date())
    declare createdAt: Date;

    @Attribute(DataTypes.DATE)
    @NotNull
    @Default(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    declare expiresAt: Date;

    @Attribute(DataTypes.DATE)
    declare revokedAt: Date | null;

    @BelongsTo(() => User, "user_id")
    declare user?: User;

    @BeforeCreate
    static async hashRefreshToken(session: Session) {
        session.refreshTokenHash = await bcrypt.hash(
            session.refreshTokenHash,
            10,
        );
    }
}
