const router = require('express').Router();
const {userShema} = require('../module/user.module')
const {seq} = require('../middleware/db.config');
const bcrypt = require('bcrypt');
const { reset, restart } = require('nodemon');
const jwt = require('jsonwebtoken')


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

//Newq user sign-up
 router.post("/register",async(req,res)=>{
    try {
        
       const Name = req.body.Name
       const Mobile = req.body.Mobile
       const Email = req.body.Email
       const Password = req.body.Password
       
       if(Name){
        let NameData = await userShema.findOne({where:{Name:Name}})
        if(NameData){
            return res.status(400).json({status:"failure",message:"UserName Already Exist!"})
        }
       }else{
        return res.status(404).json({status:"failure",message:'please enter your Name'})
    }

       if(Mobile){
        let MobileData = await userShema.findOne({where:{Mobile:Mobile}});
        if(MobileData){
            return res.status(400).json({status:'failure',message:'mobile number already exist!'});
        }
       }else{
        return res.status(404).json({status:'failure',message:'please enter your mobile number!'})
    }

       if(Email){
        let EmailData = await userShema.findOne({where:{Email:Email}});
        if(EmailData){
            return res.status(400).json({status:'failure',message:'Email id already exist!'})
        }
       }else{
        return res.status(404).json({status:'failure',message:"please enter you email id!"})
    }
        const userDetails = new userShema(req.body)
        const salt = await bcrypt.genSalt(10);
        userDetails.Password = bcrypt.hashSync(Password,salt);

         userDetails.save().then(result=>{
            return res.status(200).json({status:'success',message:'register succuss!',"result":result})
         }).catch(err=>{
            console.log("err",err.message);
            return res.status(400).json({status:"failure",message:err.message})
         })

    } catch (error) {
        console.log("err",error.message)
        return res.json({"err":error.message})
       
    }
 })

// user login
 router.post("/login",async(req,res)=>{
    try {
        const Email = req.body.Email
        const Password = req.body.Password
         userShema.findOne({where:{Email:Email}}).then(result=>{
            bcrypt.compare(Password,result.Password,(err,data)=>{
                if(err){
                    return res.json({"err":err.message})
                }
                if(data){
                    console.log(result)
                    const token = jwt.sign({result},"key");
                    console.log('token',token);
                    res.status(200).json({status:"success",message:'login success!',"token":token});
                }else{
                    res.json({status:"failure",message:"invalide password!"})
                }
            })
        }).catch(err=>{
            res.json({status:'failure',message:'Invalide Email id!'})
        })


    } catch (error) {
        return res.status(400).json({status:'failure',message:error.message})
    }
})

// user logout

router.post("/logout",async(req,res)=>{
    try {
        let data = {LaginStatus:false}
        userShema.update(
            data,
            {
                where:{
                    id :req.query.id
                }
            }
        ).then(()=>{
            return res.status(200).json({status:'succuss',message:'Logout successfull!'})
        }).catch(err=>{
            return res.status(400).json({status:'failure',"err":err.message});
        })

    } catch (error) {
        return res.status(400).json({status:'failure',message:error.message})
    }
})


module.exports = router
