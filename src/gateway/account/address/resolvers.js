import { generalRequest } from '../../../utilities';
import { url, port, entryPoint } from '../server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		list: (_,{ jwt }) => {
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL}/address`, 'GET', _, headers)
		},
	},
	Mutation: {
		add: (_, { address, jwt }) => {
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL}/address`, 'POST', address, headers)
		},
        delete: (_, { address, jwt }) => {
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL}/address`, 'DELETE', address, headers)
		},
	}
};

export default resolvers;
