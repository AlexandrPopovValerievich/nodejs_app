import express from 'express'
import {Books} from './database/models.js'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))

app.get('/books',async(req,res)=>{
    res.send(await Books.findAll())
})

app.get('/books/:id',async(req,res)=>{
    res.send(await Books.findOne({where:{Id: req.params.id}}))
})

app.post('/books',async(req,res)=>{
    res.send(await Books.create({
        Name: req.body.name
    }))
})

app.put('/books/:id',async(req,res)=>{
    const data  = await Books.update(
        {Name: req.body.name},
        {where:{id: req.params.id}}
    )
    res.send(data ? 'Success': 'Error') 
})

app.delete ('/books/:id',async(req,res)=>{
    const data = await Books.destroy({
        where:{id: req.params.id}
    })
    res.send(data ? 'Success' : 'Error')
})
app.listen(8081)

