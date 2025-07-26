import bcrypt from 'bcrypt'

async function hashPassword(next){
  if(!this.isModified('password')){
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
    return next()
  } catch (error) {
    return next(error)
  }
}

export default hashPassword