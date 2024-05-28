import { DataTypes } from 'sequelize';
import sequelize from '../../server/sequelize';
import User, { UserAttributes } from './User';

/**
 * Interface defining the unique attributes of the Staff model.
 */
interface StaffAttributes extends UserAttributes {
  salary: number;
  jobTitle: string;
}

/**
 * Staff model class definition.
 * 
 * This class extends the User model class and implements the StaffAttributes interface.
 * It defines the shape of the Staff table and includes methods for interacting with staff data.
 */
class Staff extends User implements StaffAttributes {
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
    defaultValue: 0.0,
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

/**
 * Initialize the Staff model.
 * 
 * This method maps the Staff class to the staff table in the database.
 * It defines the schema of the staff table, including column types and constraints.
 */
Staff.init({
  ...User.getAttributes(),
  ...staffAttributes
}, {
    sequelize,
    tableName: 'staff',
});

export default Staff;