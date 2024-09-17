import Joi from "joi";

let validationMsgs = {
  username: {
    "string.alphanum": "Username must contain only letters and numbers",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must not exceed 30 characters",
    "string.empty": "Username is required",
  },
  email: {
    "string.email": "Email must be in a valid format (e.g., user@domain.com)",
    "string.empty": "Email is required",
  },
  password: {
    "string.pattern.base":
      "Password must be between 8 and 30 characters, containing only letters and numbers",
    "string.empty": "Password is required",
  },
  confirmPass: {
    "any.only": "Password and confirmation must match",
    "string.empty": "Password confirmation is required",
  },
};

export const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages(validationMsgs.username),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages(validationMsgs.email),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .messages(validationMsgs.password),

  confirmPass: Joi.ref("password"),
})
  .options({ abortEarly: false })
  .messages(validationMsgs.confirmPass);

export const mapValidationToState = (user) => {
  const { error } = schema.validate(user);
  if (error) {
    return error.details
      .map((validObj) => {
        return { [validObj.context.key]: validObj.message };
      })
      .reduce((initialObject, currentObject) => {
        return { ...initialObject, ...currentObject };
      });
  }
  return null;
};
