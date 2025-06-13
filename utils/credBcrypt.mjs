import bcrypt from 'bcrypt'


function credBcrpyt(user){
    const salt = await bcrypt.genSalt(10);

    const validPW = await bcrypt.compare(password,user.password)

    const hashPW = await bcrypt.hash(password,salt)

    const emailPW = await bcrypt.hash(email, salt)

};
