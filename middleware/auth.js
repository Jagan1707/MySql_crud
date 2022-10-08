const jwt = require('jsonwebtoken');


function verify(req,res,next){
    try {
        const token = req.header('token')
        if(!token){
            return res.json({status:'failure',message:'token Not recived'})
        }

       const decode =  jwt.verify(token,'key')
        if(decode){
            console.log('decode',decode)
            next()
        }

    } catch (error) {
        return res.json({"err":error.message})
    }
}

function adminVerify(req,res,next){
    try {
        const token = req.header('token')
        if(!token){
            return res.json({status:'failure',message:'token not recived'})
        }

        const decode = jwt.verify(token,'key')
        console.log('admin',decode.result.Role)

        if(decode.result.Role == 'admin'){
            next()
        }else{
            return res.json({status:'failure',message:'Admin can only access!'})
        }

    } catch (error) {
        return res.json({'err':error.message})
    }
}



module.exports = {verify,adminVerify}

