const CryptoJS = require("crypto-js");
import User from "../../../models/User"
import connectDB from "../../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            const { name, email, password } = req.body
            console.log(req.body)
            const user = new User({
                name,
                email,
                password: CryptoJS.AES.encrypt(password, 'secret4567').toString()
            })
            await user.save()
            res.status(200).json({ message: "User has been Created", user })
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }
    else {
        res.status(400).json({ error: "Bad request" })
    }

}

export default connectDB(handler)