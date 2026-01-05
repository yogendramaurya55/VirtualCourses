import { User } from "../model/user.model.js";



const getCurrentUser = async (req , res) =>{
    try {
        const userId  = req.userId;

    if(!userId){
        return res.status(400).json({
            success:false,
            message:"Unauthorized"
        })
    }

    const user = await User.findById(userId).select("-password");

    if(!user){
        return res.status(400).json({
            success:false,
            message:"user not found"
        })
    }

    res.status(200).json({
        user,
        message:"user data sent successfully"
    })
    } catch (error) {
      return res.status(400).json({
        success:false,
        message: `error while fetching current user ${error}`
      })  
    }
}

export 
{
    getCurrentUser
}