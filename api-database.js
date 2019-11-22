const express = require("express");
const expressRouter = express.Router();
const Database = require("./database");
const ObjectID = require("mongodb").ObjectID;

class DataRouter{
    dataRouter 
    constructor(){
        this.dataRouter = expressRouter;
        
        this.dataRouter.get("/", async (req,res) => {    
    
            const readParams = {
                collection      : "inventory",
                criteria        : {},
                projection      : {}
            }
            try{
                const docs = await new Database().read(readParams);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        
        })
        
        this.dataRouter.post("/", async (req, res) => {
        
            const writeParams = {
                collection      : "inventory",
                data            : req.body
            }
            try{
                const docs = await new Database().write(writeParams);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        })
        
        this.dataRouter.post("/inventories", async (req, res) => {
            const writeMany = {
                collection      : "inventory",
                data            : req.body
            }
            try{
                const docs = new Database().writeMany(writeMany);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        })
        
        this.dataRouter.put("/:id", async (req, res) => {
            const updateParams = {
                collection      : "inventory",
                criteria        : { "_id": new ObjectID(req.params.id) },
                data            : req.body
            }
            try{
                const docs = new Database().update(updateParams);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }   
        })
        
        this.dataRouter.put("/inventories/:id", async (req, res) => {
            const updateParams = {
                collection      : "inventory",
                criteria        : { "_id": new ObjectID(req.params.id) },
                data            : req.body
            }
            try{
                const docs = await new Database().updateMany(updateParams);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        })
        
        this.dataRouter.delete("/:id", async (req, res) => {
            const DeleteParams = {
                collection      : "inventory",
                criteria        : { "_id": new ObjectID(req.params.id) }
            }
            try{
                const docs = new Database().delete(DeleteParams);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        })

    }
}

module.exports = DataRouter;