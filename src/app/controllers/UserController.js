//Importação das dependencias
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//Importação dos modelos
import User from '../models/User';

//Importação das configuracoes para geração de token 
import authConfig from '../../config/auth';

//Cria classe para controle de usuarios
class UserController {
  //Metodo para criação de um novo usuario
  async store(req, res) {
    try {
      //Busca usuario com as informacoes fornecidas
      const userExists = await User.findOne({ email: req.body.email });

      //Valida se email já cadastrado
      if (userExists) {
        //Retorna erro com status 400
        return res.status(400).json({ error: 'Email já cadastrado' })
      }

      //Insere usuário na base
      const { _id, name, email } = await User.create(req.body);

      //Gera token
      const token = jwt.sign({ _id }, authConfig.secret, { expiresIn: authConfig.expiresIn })

      //Retorna os dados do usuario criado e o token
      return res.json({ user: { _id, name, email }, token });

    } catch (error) {
      return res.status(400).json({ error });
    }

  }

  //Metodo para atualizacao de usuario
  async update(req, res) {
    //Com desestruturacao pega campos do body
    const { _id, email, oldPassword, password, name } = req.body;

    //Busca usuario pelo _id e solicita que venha senha tambem
    const user = await User.findById({ _id }).select('+password');

    //Altera email
    if (email && email != user.email) {
      //Valida email já cadastrado
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ error: 'Email já cadastrado' })
      }
      //Atualiza email
      await User.update({ _id }, { $set: { email } });

      return res.json({ _id, email });
    }

    //Altera senha
    if (oldPassword && password) {
      //Valida se a senha anterior está correta
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(401).json({ error: 'Senha anterior inválida' });
      }
      //Atualzia senha
      await User.update({ _id }, { $set: { password } });

      return res.json({ _id });
    }

    //Aletra nome
    if (name && name != user.name) {
      //Atualiza nome
      await User.update({ _id }, { $set: { name } });

      return res.json({ _id, name });
    }

    return res.json({ _id });
  }
}

export default new UserController();