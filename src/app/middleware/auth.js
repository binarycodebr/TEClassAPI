//Importacao das dependencias
import jwt from 'jsonwebtoken';

//Importacao das configuracoes para geracao de token 
import authConfig from '../../config/auth';

//exporta middleware de validacao de autenticacao
export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  //Valida se o token foi informado
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não infromado' });
  }

  //Pegando apenas o token do array com desestruturacao
  const [, token] = authHeader.split(' ');

  try {
    //Metodo possui callback assincrono próprio
    jwt.verify(token, authConfig.secret, (error, response) => {
      if (!error && response) {
        //Atribui _id ao response
        req.body._id = response._id;

        //Libera prosseguimento pois usuario esta validado
        return next();
      } else {
        return res.status(401).json({ error: 'Token inválido' });
      }
    });
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}