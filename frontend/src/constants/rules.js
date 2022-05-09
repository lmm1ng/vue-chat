export const required = {required: true, message: 'Field is required', trigger: 'blur'}
export const email = {type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']}
export const password = { type: 'string', min: 4, message: 'Password must be longer than 4' }