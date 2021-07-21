import { IUser } from "../models/user"
import { comparePassword, hashPassword } from "../util/crypto"

export async function setPassword(user: IUser): Promise<string | null> {
  const hash = await hashPassword(user.password!)
  if (!hash) return null
  user.password = hash
  return hash
}

export async function passwordVerification(user: IUser, passwordHash: string): Promise<boolean> {
  return await comparePassword(user.password!, passwordHash)
}
