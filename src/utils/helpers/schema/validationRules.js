/* eslint-disable no-param-reassign */
import Joi from 'joi'

const nameErrors = (errors, name) => {
  errors.forEach(error => {
    switch(error.code) {
      case 'string.regex.base':
        error.message = `${name} cannot cantain a number or special character!`
        break
      case 'string.base':
        error.message = `${name} must be a string`
        break
      case 'string.min':
        error.message = `${name} must be at list 2 characters long!`
        break
      case 'any.required':
        error.message = `${name} is Required!`
        break
      default:
        break
    }
  })
  return errors
}

const validationRules = {
  firstName: Joi.string()
    .min(2)
    .required()
    .regex(/^[A-Za-z]*$/)
    .error(errors => nameErrors(errors, 'First Name')),
  
  lastName: Joi.string()
    .min(2)
    .required()
    .regex(/^[A-Za-z]*$/)
    .error(errors => nameErrors(errors, 'Last Name')),
  
  email: Joi.string()
    .email({ minDomainSegments: 2})
    .required(),

  user: Joi.string()
    .required()
    .error(errors => {
      errors.forEach(error => {
        switch(error.code) {
          case 'any.required':
            error.message = 'Email or Username is required'
            break
          default:
            break

        }
      })
      return errors
    }),
  
  password: Joi.string()
    .regex(/^.{3,}$/)
    .required()
    .error(errors => {
      errors.forEach(error => {
        switch(error.code) {
          case 'string.pattern.base':
            error.message = `Password should be of minimum 3 characters length!`
              break
          case 'string.base':
            error.message = 'Password must be string'
            break
          case 'any.required':
            error.message = 'Password is required'
            break
          default:
            break

        }
      })
      return errors
    }),
  
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .error(errors => {
      errors.forEach(error => {
        switch (error.code) {
          case 'any.only':
            error.message = 'Passwords must match'
            break
          case 'string.base':
            error.message = 'Confirm Password must be a tring'
            break
          case 'any.required':
            error.message = 'Confirm password is required'
            break
          default:
            break
        }
      })
      return errors
    })
}

export const signupUserSchema = Joi.object().keys({
  firstName: validationRules.firstName,
  lastName: validationRules.lastName,
  email: validationRules.email,
  password: validationRules.password,
})

export const loginUserSchema = Joi.object().keys({
  user: validationRules.user,
  password: validationRules.password
})

export default validationRules
