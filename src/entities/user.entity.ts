import {v4 as uuid} from 'uuid';

class NewUserEnitity {

    private id: string;
    private username: string;
    private password: string;


    constructor(username: string, hashedpassword: string){
        this.id = uuid(),
        this.username = username,
        this.password = hashedpassword
    }

}

interface UserDataEntity extends NewUserEnitity{
    profile_photo?: Blob;
    lastname?: string;
    firstname?: string;
    birthday?: Date;
    country?: string;
    city?: string;
    occupation?: string;
    school?: string;
    description?: string;

}