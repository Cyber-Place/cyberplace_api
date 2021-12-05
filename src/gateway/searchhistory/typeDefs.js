export const historyTypeDef = `
    type SearchHistory {
        id: String!
        username: String!
        items: [SearchItem]!
    }
    type SearchItem {
        id: String!
        searchTime: String!
        productId: Int!
    }
    input SearchHistoryInput {
        username: String!
    }
    input SearchItemInput {
        productId: Int!
    }
    `;

export const historyQueries = `
    allSearchHistories: [SearchHistory]!
    historyById(id: String!): SearchHistory!
    historyByUsername(username: String!): SearchHistory!
    mySearchHistory(jwt: String!): SearchHistory!
  `;

export const historyMutations = `
    createHistory(history: SearchHistoryInput!): SearchHistory!
    updateHistory(id: String!, history: SearchHistoryInput!): SearchHistory!
    deleteHistory(id: String!): String
    addItem(idHistory: String!, item: SearchItemInput!): SearchHistory!
    removeItem(idHistory: String!, idItem: String!): SearchHistory!
    removeAllItems(idHistory: String!): SearchHistory!
    addItemMyHistory(jwt: String!, item: SearchItemInput!): SearchHistory!
    deleteItemMyHistory(jwt: String!, idItem: String!): SearchHistory!
    deleteMyHistory(jwt: String!): SearchHistory!
`;
