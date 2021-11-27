import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		validateToken: (_) =>
			getRequest(URL, 'validate'),
	},
	Mutation: {
		register: (_, { register }) =>
			generalRequest(`${URL}/register`, 'POST', register),
		reset: (_, { reset }) =>
			generalRequest(`${URL}/reset`, 'POST', reset),
		login: (_, { login }) =>
			generalRequest(`${URL}/login`, 'POST', login)
	}
};

export default resolvers;
