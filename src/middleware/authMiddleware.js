import jwt from 'jsonwebtoken'

export const verifyToken = async (req , res , next) => {
  //check the header 
  const authHeader = req.header('Authorization')

  //authHeader = Bearer <token>
  if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({ message: 'no token , authorization denied'})
  }

  //extract the token
  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ message: 'Token not valid'})
  }
}

export const authorizeRoles = (roles) => {
  return (req , res , next) => {
    if(!roles.includes(req.user.role)){
      return res.status(403).json({ message: 'Forbiden'})
    }
    console.log('User Role:' , req.user.role)
    next()
  }
}