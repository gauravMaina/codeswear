import User from "../../../models/User"
import connectDB from "../../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            const user = new User(req.body)
            await user.save()
            res.status(200).json({ message: "User has been Created", user })
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error :error})
        }
    }
    else {
        res.status(400).json({ error: "Bad request" })
    }

}

export default connectDB(handler)