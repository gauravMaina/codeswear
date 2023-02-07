import User from "../../../models/User"
import connectDB from "../../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            if (user) {
                if (user.email === req.body.email && user.password === req.body.password) {
                    res.status(200).json({ success: true, user })
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