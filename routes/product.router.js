const router = require('express').Router();
const {productSchema} = require('../module/product.module');

const {verify,adminVerify} = require('../middleware/auth')



router.post("/addProduct",async(req,res)=>{
    try {
        const productDetails = new productSchema(req.body);

        
        productDetails.save().then(result=>{
            return res.json({status:'success',"result":result})
        }).catch(err=>{
            return res.json({"err":err.message})
        })


    } catch (error) {
        return res.json({"err":error.message});
    }
})



router.get("/getProduct",adminVerify,async(req,res)=>{
    try {
        const productDetails = await productSchema.findAll();
        if(productDetails.length > 0){
            return res.json({status:'success',"result":productDetails})
        }else{
            return res.json({status:'failure',message:'invalid product details'})
        }
    } catch (error) {
        return res.json({"err":error.message})
    }
})

router.get('/singleProduct',async(req,res)=>{
    try {
        productSchema.findOne({
            where:{
                id:req.query.id
            }
        }).then(result=>{
            return res.json({status:'success',"result":result})
        }).catch(err=>{
            return res.json({"err":err.message})
        })
    } catch (error) {
        return res.json({"err":error.message})
    }
})


router.put('/updateProduct',async(req,res)=>{
    try {
        productSchema.update(
            req.body,
            {
                where:{
                    id:req.body.id
                }
            }
        ).then(result=>{
            return res.json({status:"success","result":result})
        }).catch(err=>{
            return res.json({"err":err.message})
        })


    } catch (error) {
        return res.json({"err":error.message})
    }
})


router.delete("/deleteproduct",async(req,res)=>{
    try {
    
        productSchema.destroy({
            where:{
                id:req.query.id
            }
        }).then(()=>{
            return res.json({status:'success',message:'successfully deleted!'})
        }).catch(err=>{
            return res.json({"err":err.message})
        })

    } catch (error) {
        return res.json({"err":error.message})
    }
})


router.get('/categoryBassed',async(req,res)=>{
    try {
        const categoryID = req.query.categoryID
        productSchema.findOne({
            where:{
                categoryID : categoryID
            }
        }).then(result=>{
            return res.json({status:'success',"result":result})
        }).catch(err=>{
            return res.json({"err":err.message})
        })
    } catch (error) {
        return res.json({"err":error.message})
    }
})




module.exports = router