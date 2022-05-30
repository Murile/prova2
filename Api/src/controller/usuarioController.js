import { login } from '../repository/usuarioRepository.js'

import { Router } from 'express'
const server = Router();

server.post('/usuario/login', async (req, resp) =>{
    try{
    const {email, senha}= req.body;
    const resposta = await login(email, senha);
    resp.send(resposta)
    }
    catch(err){
        console.log(err);
        resp.status(404).send({
            erro:"ocorreu um erro"
        })
    } 
})


export default server ;
