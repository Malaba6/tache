import { options } from 'utils/helpers/schema'

/**
 * 
 * @param {function} handler
 * @param {object} schema user validation schema
 * @returns error message if request not valid, otherwise proceed to the request handler
 */
export const withValidation = (handler, schema) => (req, res) => {
  const { error } = schema.validate(req.body, options)

  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/\\|(")/g, '')
    })
  }

  // Proceed to the handler in case all request data is valid
  return handler(req, res)
}

export const withLoginValidation = null
