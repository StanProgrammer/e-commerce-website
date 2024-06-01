const validationMessages = {
    name: {
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be an empty field',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is a required field'
    },
    id: {
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
    },
    productName: {
        'string.base': 'Product name should be a type of text',
        'string.empty': 'Product name cannot be an empty field',
        'string.min': 'Product name should have a minimum length of {#limit}',
        'string.max': 'Product name should have a maximum length of {#limit}',
        'any.required': 'Product name is a required field'
    },
    brandName: {
        'string.base': 'Brand name should be a type of text',
        'string.empty': 'Brand name cannot be an empty field',
        'string.min': 'Brand name should have a minimum length of {#limit}',
        'string.max': 'Brand name should have a maximum length of {#limit}',
        'any.required': 'Brand name is a required field'
    },
    category: {
        'string.base': 'Category should be a type of text',
        'string.empty': 'Category cannot be an empty field',
        'any.required': 'Category is a required field'
    },
    productImage: {
        'array.base': 'Product image should be an array of strings',
        'array.min': 'Product image should have at least {#limit} item',
        'any.required': 'Product image is a required field'
    },
    description: {
        'string.base': 'Description should be a type of text',
        'string.empty': 'Description cannot be an empty field',
        'any.required': 'Description is a required field'
    },
    price: {
        'number.base': 'Price should be a number',
        'number.empty': 'Price cannot be an empty field',
        'any.required': 'Price is a required field'
    },
    selling: {
        'number.base': 'Selling price should be a number',
        'number.empty': 'Selling price cannot be an empty field',
        'any.required': 'Selling price is a required field'
    }
};

module.exports = validationMessages;
