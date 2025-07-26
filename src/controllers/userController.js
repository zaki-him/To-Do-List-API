import User from "../modules/user.js"
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign({ id: user.id , role: user.role } , process.env.JWT_SECRET , { expiresIn: "30d"})
}

// POST /user/register
export const addUser = async (req , res) => {
  try {
    const {name , email , password , role} = req.body

    //check if all fields are added
    if(!name || !email || !password){
      return res.status(400).json({message: 'Please add all fields'})
    }

    //check if the user already exists

    const userExists = await User.findOne({email})

    if(userExists){
      return res.status(400).json({message: 'User already exists'})
    }

    const newUser = new User({name , email , password , role})
    await newUser.save()
    res.status(201).json({message: 'user registered successfully' , user:{
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser)
    }})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}  

// POST /user/login
export const loginUser = async (req , res) => {
  try {
    const {email , password} = req.body
    const userExists = await User.findOne({ email })

    if(!userExists){
      return res.status(400).json({message: 'No user found with this email'})
    }

    const correctPassword = await userExists.comparePassword(password)

    if(!correctPassword){
      return res.status(400).json({message: 'Invalid password'})
    }

    res.status(201).json({message: 'User Can Login' , user: {
      name: userExists.name,
      email: userExists.email,
      token: generateToken(userExists)
    }})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
