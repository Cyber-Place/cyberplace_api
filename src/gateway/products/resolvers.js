import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allProducts: (_, {}) => {
			return generalRequest(URL, 'GET');
		},
		productsById: (_, {id}) => {
			return generalRequest(`${URL}/${id}`, 'GET');
		},
		},
		Mutation: {
			addProduct: (_, { product }) => {
				return generalRequest(`${URL}`, 'POST', product);
			},
			updateProduct: (_, { id, product }) => {
				return generalRequest(`${URL}/${id}`, 'PUT', product);
			},
			deleteProduct: (_, {id}) => {
				return generalRequest(`${URL}/${id}`, 'DELETE');
			},
		},
	};

export default resolvers;
