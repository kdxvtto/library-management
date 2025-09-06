const {body,validationResult} = require('express-validator')

const addUserValidation = [
  body('name').isString().withMessage('name must be string'),
  body('email').isEmail().withMessage('email must be string'),
  body('password').isString().withMessage('password must be string'),
  body('address').isString().withMessage('address must be string')
]

const updateUserValidation = [
  body('name').isString().withMessage('name must be string'),
  body('email').isEmail().withMessage('email must be string'),
  body('password').isString().withMessage('password must be string'),
  body('address').isString().withMessage('address must be string')
]

const result = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  addUserValidation,
  updateUserValidation,
  result
}