export interface LoginInput {
    email: string
    password: string
}

export interface RegisterInput {
    fullName: string,
    phoneNumber: string,
    gender: string,
    dateOfBirth: string,
    address: string,
    city: string,
    state: string,
    country: string,
    zipCode: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms?: boolean,
}
