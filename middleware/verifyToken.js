const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1]
    try {
        if(!token){
            return res.status(403).json({
                success : false,
                message : 'Access denied'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = verifyToken