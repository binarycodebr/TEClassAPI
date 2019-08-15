//Importação das dependencias
import mongoose from 'mongoose';

//Importação das configuração de conexão com Mongo
import databaseConfig from '../config/database';

//Define a classe Database
class Database {
  //Executa automaticamente
  constructor() {
    this.init();
  }

  //Define o método init com a conexão do Mongo
  init() {
    //Atribui ao servidor a conexão com Mongo
    this.connection = mongoose.connect(
      databaseConfig.url,
      databaseConfig.config
    );
  }
}

//Exporta uma instancia da conexão
export default new Database();