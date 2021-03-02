import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

class PasswordManager {
  static async toHash(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(8);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  static async compare(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(suppliedPassword, storedPassword);
  }
}

export default PasswordManager;
