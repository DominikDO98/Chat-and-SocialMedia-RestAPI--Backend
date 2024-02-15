// import { v4 as uuid } from 'uuid'
// import { ZodError, ZodIssue } from "zod"
// import { GroupEnitiy } from '../../src/entities/group.entity/group.types';
// import { groupFactory } from '../../src/entities/group.entity/group.entity';

// describe('group', () => {
//     describe('group entity', () => {
//         const newGroup: Omit<GroupEnitiy, 'id' | 'created_at'> = {
//             admin_id: uuid(),
//             name: 'name',
//             is_private: true,
//             description: 'some desc',
//             profile_photo: new Blob(),
//         }
//         const newPlainGroup: Omit<GroupEnitiy, 'id' | 'created_at'> = {
//             admin_id: uuid(),
//             description: 'some desc',
//         }
//         test('groupFactory create correct instance of the group object', () => {
//             const group = groupFactory(newGroup);
//             const plainGroup = groupFactory(newPlainGroup);

//             expect(group.id).toBeDefined();
//             expect(group.name).toStrictEqual(newGroup.name);
//             expect(group.created_at).toBeInstanceOf(Date);
//             expect(group.is_private).toStrictEqual(newGroup.is_private);
//             expect(group.profile_photo).toBeInstanceOf(Blob);
//             expect(group.profile_photo).toStrictEqual(newGroup.profile_photo);
            
//         })
//     })
// });