const router = require('express').Router();

const {categorySchema} = require("../module/category.module");



router.post("/addCat",async(req,res)=>{
    try {
        const category = new categorySchema(req.body);
        category.save().then(result=>{
            return res.status(200).json({status:'success',"resilt":result})
        }).catch(err=>{
            console.log("err",err.message);
            return res.json({"err":err.message})
        })

    } catch (error) {
        return res.status(400).json({"err":error.message})
    }
})

router.get("/getCat",async(req,res)=>{
    try {
        const category = await categorySchema.findAll();

        if(category.length > 0){
            return res.json({status:'success',"result":category})
        }else{
            return res.json({status:"failure"});
        }

    } catch (error) {
        return res.json({"err":error.message})
    }
})

router.put('/updateCat',async(req,res)=>{
    try {
        
        categorySchema.update(
            req.body,
            {
                where : {
                    id : req.body.id
                }
            }
        ).then(result=>{
            return res.json({status:'success',"result":result})
        }).catch(err=>{
            return res.json({"err":err.message})
        })

    } catch (error) {
        return res.json({"err":error.message})
    }
})
router.delete("/deleteCat",async(req,res)=>{
    try {
        categorySchema.destroy({
            where:{
                id : req.query.id
            }
        }).then(result=>{
            return res.json({status:'success',message:'deleted succuss!'})
        }).catch(err=>{
            return res.json({"err":err.message})
        })


    } catch (error) {
        return res.json({"err":error.message})
    }
})



module.exports = router