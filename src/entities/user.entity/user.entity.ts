import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { NewUserEnitity } from './user.entity.types';

const userFactory = async (newUser: Omit<NewUserEnitity, 'id'>): Promise<NewUserEnitity> => {
    const hashedPassword = await hash(newUser.password, 10);
    const user: NewUserEnitity = {
        id: uuid(),
        username: newUser.username,
        password: hashedPassword,
        email_address: newUser.email_address,
    }
    return user
};



