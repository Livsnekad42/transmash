// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs")

export const hashPassword = async (
  password: string,
  saltRounds: number = 10,
): Promise<string | null> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
  } catch (error) {
    console.log(error)
  }
  return null
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    // Compare password
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.log(error)
  }

  // Return false if error
  return false
}
