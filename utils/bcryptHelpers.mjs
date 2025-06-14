import bcrypt from 'bcrypt'


export async function hashedPassword(password, rounds = 12){
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(password,salt)
};


export async function verifyPassword(password, hashed){
  return await bcrypt.compare(password,hashed)
}


