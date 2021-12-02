export const authTypeDef = `
    type AccessToken{
        accessToken : String!
    }
    type UserLogin {
        statusCode : Int!
        method : String!
        message : String!
        data : AccessToken!
    }
    input UserLoginInput {
        UserName: String!
        Password: String!
    }



    type Validation{
        statusCode : Int!
        method : String!
        message : String!
    }

    `;

export const authQueries = `
    authorize(jwt: String!): Validation!
`;

export const authMutations = `
    login(user: UserLoginInput!): UserLogin!
`;
