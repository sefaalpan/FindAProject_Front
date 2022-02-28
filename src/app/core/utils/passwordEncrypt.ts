import * as bcrypt from 'bcryptjs';

export class PasswordEncrypt {

    static encrypt(toEncrypt: string) {
        const salt = bcrypt.genSaltSync(10);
        const encrypt = bcrypt.hashSync(toEncrypt, salt);
        
        return encrypt;
    }

}