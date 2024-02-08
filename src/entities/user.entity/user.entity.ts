import { hashSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { z } from "zod";
import { NewUserEnitity } from './user.types';

const newUserSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(5).max(36),
    password: z.string().length(72),
    email_address: z.string().email().max(320),
})

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



