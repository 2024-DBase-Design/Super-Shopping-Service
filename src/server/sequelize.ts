import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();

/**
 * Initialize Sequelize instance.
 *
 * This instance is configured to connect to a PostgreSQL database using the connection details
 * specified in the environment variables.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: 'postgres'
  }
);

export default sequelize;
