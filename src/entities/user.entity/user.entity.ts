import { hashSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { NewUserEnitity } from './user.types';

const userFactory = (newUser: Omit<NewUserEnitity, 'id'>): NewUserEnitity => {
    const hashedPassword = hashSync(newUser.password, 10);
    const user: NewUserEnitity = {
        id: uuid(),
        username: newUser.username,
        password: hashedPassword,
        email_address: newUser.email_address,
    }
    return user
};



