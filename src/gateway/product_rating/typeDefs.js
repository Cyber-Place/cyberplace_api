export const ratingTypeDef = `
    scalar Date
    input comentariosInput {
        id_producto : Int!
        date_comment : String!
        rate_comment : Int!
        comment: String!
        user: String!
        email_user: String
    }

    input preguntaInput {
        date_pregunta : String
        pregunta : String!
        user : String!
        email_user: String!
    }
    input calificacionesInput {
        rate : Int!
        id_producto : Int!
        id_comprador : Int!
        
    }

    type comentarios {
        id_producto : Int!
        date_comment : String!
        rate_comment : Int!
        comment: String!
        user: String!
        email_user: String
    }
    type pregunta {
        date_pregunta : String!
        pregunta : String!
        user : String!
        email_user: String!
    }
    type calificaciones {
        rate : Int!
        id_producto : Int!
        id_comprador : Int!
    }
    `;

export const ratingQueries = `
    comentarios_producto: [comentarios]!
    preguntas_producto:[pregunta]!
    calificaciones_producto:[calificaciones]!


`;

export const ratingMutations = `
    comentarios_producto(comentarios: comentariosInput!): comentarios!
    preguntas_producto(pregunta:preguntaInput!): pregunta!
    calificaciones_producto(calificaciones: calificacionesInput!):calificaciones!


`;