const errorHandler = (err, req,res, next) =>{
    res.status(err.statusCode || 500).json({
        error : {
            message : "Something went wrong",
            detail : err.message
        }
    })
    next()
}