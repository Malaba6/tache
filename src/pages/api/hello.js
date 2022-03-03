// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db, { user } from 'sequelizeDb/models'

export default async function handler(req, res) {
  await db.sequelize.sync({alter: false})

  // if (req.method !== 'POST') {
  //   return res
  //     .status(405)
  //     .json({ error: 'Only POST requests allowed' })
  // }

  // const { publicAddress } = req.body

  // if (publicAddress) {
  //   const usr = await user.findOne({ where: { publicAddress }})
  //   if (usr) {
  //     return res.status(200).json({
  //       id: usr.id,
  //       nonce: usr.nonce,
  //       publicAddress: usr.publicAddress,
  //     })
  //   }
  //   const createdUser = await user.create(req.body)
  //   return res.status(201).json({
  //       id: createdUser.id,
  //       nonce: createdUser.nonce,
  //       publicAddress: createdUser.publicAddress,
  //   })
  // }

  // const { email, username, password } = req.body

  // const usr = await user.findOne({ where: { email }})
  // const name = await user.findOne({ where: { username }})

  // if (name) {
  //   return res.status(409).json({
  //     error: `Username ${username} already taken`
  //   })
  // }

  // if (usr) {
  //   return res.status(409).json({
  //     error: `Email ${email} already exist`
  //   })
  // }

  // req.body.password = hashedPassword(password)

  // const createdUser = await user.create(req.body)

  // return res.status(201).json({
  //   message: 'User successfully created',
  //   data: {
  //     id: createdUser.id,
  //     firstName: createdUser.firstName,
  //     lastName: createdUser.lastName,
  //     username: createdUser.username,
  //     email: createdUser.email
  //   }
  // })
  return res.status(200).json({ Message: 'Welcome to Tache!' })
}

// export default withValidation(handler, signupUserSchema)

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
