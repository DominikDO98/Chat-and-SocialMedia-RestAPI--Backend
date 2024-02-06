export type UserEntity = {
    id: string;
    username: string;
    password: string;
    email_address:string;
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

export type NewUserEnitity = Pick<UserEntity, 'id' | 'username' | 'password' | 'email_address'> 