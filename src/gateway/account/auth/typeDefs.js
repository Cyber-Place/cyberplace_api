export const authTypeDef = `
    type AccessToken {
        accessToken : String!
    }
    type UserLogin {
        statusCode : Int!
        method : String!
        message : String!
        data : AccessToken!
    }
    input UserLoginInput {
        username: String!
        password: String!
    }
    type UserGeneric {
        statusCode : Int!
        method : String!
        message : String!
    }
    input UserRegisterInput {
        username : String!
        full_name : String!
        email : String!
        password : String!
    }
    input UserResetInput {
        password: String!
        new_password: String!
    }
    type UserGenericData {
        statusCode : Int!
        method : String!
        message : String!
        data : String!
    }
    `;

export const authQueries = `
    authorize(jwt: String!): UserGeneric!
    getusername(jwt: String!): UserGenericData!
`;

export const authMutations = `
    login(user: UserLoginInput!): UserLogin!
    register(user: UserRegisterInput!): UserGeneric!
    reset(user: UserResetInput!, jwt: String!): UserGeneric!
`;
