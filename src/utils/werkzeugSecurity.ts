import crypto from "crypto";
/**
 * Validate a password against a stored hash
 *
 * @param {string} password - The password to hash
 * @param {string} storedHash - The stored hash to compare
 * @returns {string} - The hashed password
 */
export default function werkzeugSecurity(password: string, storedHash: string) {
  try {
    // Split the stored hash into its parts
    const [algorithm, salt, hashedPassword] = storedHash.split("$");

    if (algorithm !== "sha256") {
      throw new Error("Unsupported algorithm");
    }

    // Create hash from password and salt
    // const hash = crypto.createHash('sha256');
    // hash.update(salt + password); // Concatenate the salt and password
    // const calculatedHash = hash.digest("hex");
    const hash = crypto.createHmac("sha256", salt);
    hash.update(password);
    const calculatedHash = hash.digest("hex");

    // Compare the calculated hash with the stored hash
    return calculatedHash === hashedPassword;
  } catch (error) {
    console.error("Error validating password:", error);
    return false;
  }
}
