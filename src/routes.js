//Importação somnete a funcão Router
import { Router } from 'express';

//Importação dos Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

//Importação dos Middlewares
import authMiddleware from './app/middleware/auth';

//Instancia as rotas
const routes = new Router();

//Cria a rota e qual o método HTTP ele vai usar
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

//Middleware para controle de autenticação
routes.use(authMiddleware);

//Cria a rota e qual o método HTTP ele vai usar, só sera chamado se passar pelo middlewrare de autenticacao
routes.put('/users', UserController.update);

//Exporta as rotas
export default routes;
