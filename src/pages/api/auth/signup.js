import { hashedPassword } from 'utils/helpers/auth'
import { withValidation } from 'middleware/withValidation'
import { signupUserSchema } from 'utils/helpers/schema/validationRules'
import db, { User } from 'sequelizeDb/models'

async function handler(req, res) {
  await db.sequelize.sync({alter: false})

  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Only POST request allowed' })
  }

  const { email, password } = req.body

  const usr = await User.findOne({ where: { email }})

  if (usr) {
    return res.status(409).json({
      error: `Email ${email} already exist`
    })
  }

  req.body.password = hashedPassword(password)

  const createdUser = await User.create(req.body)

  return res.status(201).json({
    message: 'User successfully created',
    data: {
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email
    }
  })
}

// export default handler
export default withValidation(handler, signupUserSchema)
