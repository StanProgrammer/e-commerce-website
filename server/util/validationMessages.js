
const validationMessages = {
    name: {
        'string.base': 'name should be a type of text',
        'string.empty': 'name cannot be an empty field',
        'string.min': 'name should have a minimum length of {#limit}',
        'string.max': 'name should have a maximum length of {#limit}',
        'any.required': 'name is a required field'
    },
    id:{
        'string.pattern.base': 'Invalid ID format'
    },
    email: {
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email format is invalid',
        'any.required': 'Email is a required field'
    },
    password: {
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is a required field'
    },
    photo: {
        'string.uri': 'Photo must be a valid URI'
    }
};

module.exports = validationMessages;
