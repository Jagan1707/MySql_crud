const router = require('express').Router();
const {userShema} = require('../module/user.module')
const {seq} = require('../middleware/db.config');


//add user details
router.post("/addUser",async(req,res)=>{
    try {
         const datas = new userShema(req.body);
        const data = datas.save().then(result=>{
            return res.json({'status':'success',message:"userData are successfully added","result":result})
        }).catch(err=>{
            res.json({status:'failure'})
        })     
    } catch (error) {
        res.json({"err":error.message})
    }
})

// get userDetails
router.get("/feched",async(req,res)=>{
    try {
        console.log("trigger")
        const data = await userShema.findAll()
        if(data.length > 0){
            return res.json({status:'success',"result":data})
        }else{
            return res.json({status:"failure"})
        }

    } catch (error) {
        return res.json({"err":error.message})
    }
})


//get individual userDetails 
router.get("/oneUser",async(req,res)=>{
    try {
        console.log('trigger')
        userShema.findOne({
            where :{
                id : req.query.id,
                // status : {[Op.in]:[1,2]}
            }
        }).then(result=>{
            return res.json({status:"success","result":result})
        }).catch(err=>{
            console.log("err",err.message)
        })

    } catch (error) {
        return res.json({"err":error.message})
    }
})


// delete user Details
router.delete("/delete",async(req,res)=>{
    try {
        userShema.destroy({
            where:{
                id : req.query.id
            }
        }).then(()=>{
            return res.json({status:"success",message:"successfully deleted"})
        }).catch(err=>{
            console.log("err",err.message);
        })
    } catch (error) {
        return res.json({"err":error.message})
    }
})


// update userDetails
router.put('/update',async(req,res)=>{
    try {
        let updateData = {
            Name : req.body.Name,
            Mobile : req.body.Mobile,
            Email : req.body.Email 
        }
        userShema.update(
           updateData,
            {
                where : {
                    id : req.query.id
                }
            }
        ).then(result=>{
            return res.json({status:'success',"result":result})
        }).catch(err=>{
            console.log('err',err.message)
        })

    } catch (error) {
        return res.json({"err":error.message})
    }
})






module.exports = router
