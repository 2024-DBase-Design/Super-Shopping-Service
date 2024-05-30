import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../server/sequelize';
import User, { UserAttributes } from './User';
import Address from './Address';

/**
 * Interface defining the unique attributes of the Staff model.
 */
interface StaffAttributes extends UserAttributes {
  salary: number;
  jobTitle: string;
}

export interface StaffCreationAttributes extends Optional<StaffAttributes, 'id'> {}

/**
 * Staff model class definition.
 *
 * This class extends the User model class and implements the StaffAttributes interface.
 * It defines the shape of the Staff table and includes methods for interacting with staff data.
 */
class Staff extends Model<StaffAttributes, StaffCreationAttributes> implements StaffAttributes {
  public id!: number;
  public name!: string;
  public profilePicture?: string | undefined;
  public salary!: number;
  public jobTitle!: string;
}

/**
 * Define the unique attributes for the Staff model.
 */
const staffAttributes = {
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

/**
 * Initialize the Staff model.
 *
 * This method maps the Staff class to the staff table in the database.
 * It defines the schema of the staff table, including column types and constraints.
 */
Staff.init(
  {
    ...User.getAttributes(),
    ...staffAttributes
  },
  {
    sequelize,
    tableName: 'staff'
  }
);

Staff.hasMany(Address, {
  foreignKey: 'addressableId',
  constraints: false,
  scope: { addressableType: 'customer' }
});
Address.belongsTo(Staff, { foreignKey: 'addressableId', constraints: false });

export default Staff;
