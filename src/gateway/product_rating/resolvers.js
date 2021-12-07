import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		comentarios_producto: (_, {}) => {
			return generalRequest(`${URL}/comentarios`, 'GET');
		},
		preguntas_producto: (_, {}) => {
			return generalRequest(`${URL}/pregunta`, 'GET');
		},
        calificaciones_producto: (_, {}) => {
			return generalRequest(`${URL}/calificaciones`, 'GET');
		},
		},
		Mutation: {
			comentarios_producto: (_, { comentarios }) => {
				return generalRequest(`${URL}/comentarios`, 'POST', comentarios);
			},
           preguntas_producto: (_, { pregunta }) => {
				return generalRequest(`${URL}/pregunta`, 'POST', pregunta);
			},
            calificaciones_producto: (_, { calificaciones }) => {
				return generalRequest(`${URL}/calificaciones`, 'POST', calificaciones);
			},
			
		},
	};

export default resolvers;
