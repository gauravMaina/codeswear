const CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
import User from "../../../models/User"
import connectDB from "../../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            if (user) {
                const bytes = CryptoJS.AES.decrypt(user.password, 'secret4567');
                const userPassword = bytes.toString(CryptoJS.enc.Utf8);
                if (user.email === req.body.email && userPassword === req.body.password) {
                    var token = jwt.sign({ email: user.email, name: user.name }, 'jwtsecret', { expiresIn: '2d' });
                    res.status(200).json({ success: true, token })
                }
                else {
                    res.status(200).json({ success: false, message: 'Invalid Credential' })
                }
            }
            else {
                res.status(404).json({ success: false, message: 'User Not Found' })
            }

        }
        catch (error) {
            console.error(error)
            res.status(500).json({ error: error })
        }
    }
    else {
        res.status(400).json({ error: "Bad request" })
    }

}

export default connectDB(handler)