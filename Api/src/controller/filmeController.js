import { inserirFilmes } from '../repository/filmeRepository.js'

import { Router } from 'express'
const server = Router();

server.post('/filme', async (req,resp)=>{
    try{
    const filme = req.body;
    const resposta = await inserirFilmes(filme);
    resp.send({x:resposta})
    }
    catch(err){
        console.log(err);
        resp.status(404).send({
            problema:"ocorreu um erro"
        })
    }
})



export default server;