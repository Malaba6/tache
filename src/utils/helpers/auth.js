import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { pick } from 'lodash'
import { RefreshToken } from '../../../sequelize/models'

config()

/**
 * 
 * @param {object} user 
 * @returns {string} user token
 */
export const genToken = user => {
  const userDetails = {
    id: user.id,
    email: user.email,
    username: user.username
  }

  return jwt.sign(userDetails,
    process.env.SECRET_KEY,
    {expiresIn: '1d'}
  )
} 

/**
 * 
 * @param {string} password 
 * @returns {string} hashed password
 */
export const hashedPassword = password =>
  bcrypt.hashSync(password, 10)

  /**
   * 
   * @param {string} hashed 
   * @param {string} compare 
   * @returns {string} unhashed password
   */
export const unhashedPassword = (hashed, compare) =>
  bcrypt.compareSync(hashed, compare)

export const genRefreshToken = async (ownerId) => {
  const token = uuidv4()
  let refreshToken = null

  try {
    const newToken = await RefreshToken.create({
        token,
        expiresat: new Date(
          Date.now() + process.env.AUTH_REFRESH_TOKEN_EXPIRY * 60 * 1000
        ),
        ownerId
      })

    refreshToken = pick(newToken, ['token', 'expiresat'])
  
    return refreshToken
  } catch (error) {
    return {error: 'An error occured while trying to generate refresh token'}
  }
}