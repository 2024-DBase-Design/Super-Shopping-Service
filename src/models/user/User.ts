import Address from './Address';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../server/sequelize';

/**
 * Interface defining the attributes of the User model.
 */
export interface UserAttributes {
  id: number;
  name: string;
  profilePicture?: string | undefined;
}

/**
 * Interface for creating a new User, making the `id` attribute optional.
 * `id` is automatically generated by the database, so it should not be provided when creating a new user.
 */
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

/**
 * User model class definition.
 *
 * This class extends the Sequelize Model class and implements the UserAttributes interface.
 * It defines the shape of the User table and includes methods for interacting with user data.
 */
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public profilePicture?: string | undefined;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Initialize the User model.
 *
 * This method maps the User class to the users table in the database.
 * It defines the schema of the users table, including column types and constraints.
 */
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    sequelize,
    tableName: 'users'
  }
);

User.hasMany(Address, { foreignKey: 'userId', as: 'addresses' });

export default User;
