//Importação das dependencias
import express from 'express';

//Importa as rotas criadas
import routes from './routes';

//Importação da conexão com MongoDB
import './database'

//Criação da classe de configuração dos Middlewares e Rotas
class App {
  //Método que executa automaticamente ao iniciar o servidor Node
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  //Configura que os middlewares vão transacionar informações no formato JSON
  middlewares() {
    this.server.use(express.json());
  }

  //Configura as rotas a serem usadas pelo servidor  
  routes() {
    this.server.use(routes);
  }
}

//Exporta somente a nova instancia do server
export default new App().server;
