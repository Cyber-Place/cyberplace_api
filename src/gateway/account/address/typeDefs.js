<<<<<<< Updated upstream
=======
export const addressTypeDef = `
    input AddressInput {
        country : String!
        city : String!
        state : String!
        zip_code : String!
        address : String!
    }
    type AddessGeneric {
        statusCode : Int!
        method : String!
        message : String!
    }
    type Address {
        AddressID: String!
        Country: String!
        City: String!
        State: String!
        ZipCode: String!
        Address: String!
        UserName: String!
        CreatedAt: String!
        UpdatedAt: String!
    }
    type AddressList {
        statusCode : Int!
        method : String!
        message : String!
        data : [Address]!
    }
    `;

export const addressQueries = `
    list(jwt: String!): AddressList!
`;

export const addressMutations = `
    add(address: AddressInput!, jwt: String!): AddessGeneric!
    delete(address: AddressInput!, jwt: String!): AddessGeneric!
`;
>>>>>>> Stashed changes
