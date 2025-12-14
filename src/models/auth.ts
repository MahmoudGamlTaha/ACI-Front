export interface LoginInput {
    email: string
    password: string
}

export interface RegisterInput {
    companyNameAr: string,
    companyNameEn: string,
    idNumber: string,
    statisticalCode: string,
    responsibleNameAr: string,
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
