//Importa as dependencias
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//Atribui um novo esquema de dados para o modelo de usuario
const UsersSchema = new mongoose.Schema({
  //Define o campo name e suas propriedades
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
},
  {
    //Define que quando inserir/atualzia um usuario ele coloque automaticamente os campos e valores para createdAt e updatedAt
    timestamps: true
  });

//Arrow functions não tem acesso ao metodo this por isso criamos uma funcao normal
//Cria instruçao para ser executada antes da inserção do usuario no Mongo
UsersSchema.pre('save', async function (next) {
  //cria hash com base na senha informada
  const hash = await bcrypt.hash(this.password, 10);

  //Altera a senha informada pela hash gerada
  this.password = hash;

  //Libera para insercao no Mongo
  next();
});

export default mongoose.model('User', UsersSchema);