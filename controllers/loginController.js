const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const User = require('../models/User')

const loginAuth = async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password)
            if (isMatch) {
                const token = jwt.sign(
                { 
                    id: admin._id, 
                    email : admin.email, 
                    role : 'admin' 
                },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                )
                console.log(token)
                return res.status(200).json({
                    success: true,
                    data: "Login successful",
                    token,
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                })
            } 
        }

        const user = await User.findOne({ email })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    role: 'user'
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
                )
                console.log(token)
                return res.status(200).json({
                    success: true,
                    data: "Login successful",
                    token
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                })
            } 
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })  
    }
}

module.exports = loginAuth