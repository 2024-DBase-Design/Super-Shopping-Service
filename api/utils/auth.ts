import bcrypt from 'bcrypt';

/**
 * Hashes the password
 *
 * @param password
 * @returns
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compares the password with the hash
 *
 * @param password
 * @param hash
 * @returns
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
