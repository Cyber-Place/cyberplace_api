export const authTypeDef = `
    input UserRegisterInput {
        UserName: String!
        FullName: String!
        Email: String!
        Password: String!
    }
    input ResetPasswordInput {
        Password: String!
        NewPassword: String!
    }
    input LoginInput {
        UserName: String!
        Password: String!
    }`;

export const ValidationQueries = `
    validateToken(token: String!): String!
`;

export const AuthMutations = `
    register(user: UserRegisterInput!): String!
    reset(reset: ResetPasswordInput!): String!
    login(login: LoginInput!): String!
`;
