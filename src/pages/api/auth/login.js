import cookie from 'cookie'

import db, { User } from 'sequelizeDb/models'
import {
  genToken, unhashedPassword, genRefreshToken
} from 'utils/helpers/auth'
import { withValidation } from 'middleware/withValidation'
import { loginUserSchema } from 'utils/helpers/schema/validationRules'

async function handler(req, res) {
  await db.sequelize.sync({alter: false})

  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Only POST requests allowed' })
  }

  const { email , password } = req.body

  const user = await User.findOne({ where: { email }})

  if (!user || !unhashedPassword(password, user.password) ) {
    return res.status(401).json({
      error: 'Incorrect email or password'
    })
  }

  const userToken = genToken(user)
  const refreshToken = await genRefreshToken(user.id)
  const { error } = refreshToken

  if (error) {
    return res.status(400).json({
      error
    })
  }

  const { token } = refreshToken

  return res
    .setHeader('Set-Cookie', cookie
      .serialize('refreshToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/' 
      }))
    .status(200)
    .json({
      message: `Welcome back ${user.firstname}`,
      data: {
        accessToken: userToken,
        email: user.email
      }
    })
}

export default withValidation(handler, loginUserSchema)
