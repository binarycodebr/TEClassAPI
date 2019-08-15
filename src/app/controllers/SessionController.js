//Importação das dependencias
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Importação dos modelos
import User from '../models/User';

//Importação das configurações para geração de token
import authConfig from '../../config/auth';

//Cria classe para controle de sessoens com token
class SessionController {
  //Invoca o ASYNC para operações assincronas
  async store(req, res) {
    try {
      //Obtem através de desestruturação os campos email e senha do body
      const { email, password } = req.body;

      //Busca usuario na base com as informações fornecidas
      const user = await User.findOne({ email }).select('+password');

      //Valida que usuario existe
      if (!user) {
        return res.status(401).json({ error: 'Usuário não existe' });
      }

      //Valida se a senha está correta
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      //Gera token para retorno de sessao
      const token = jwt.sign({ _id: user._id }, authConfig.secret, { expiresIn: authConfig.expiresIn })

      //Remove campos desnecessários no retorno das informações
      user.password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;

      //Retorna o usuario e o token gerado
      return res.json({ user, token });

    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new SessionController();

