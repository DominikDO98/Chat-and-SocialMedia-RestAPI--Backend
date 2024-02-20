import { v4 as uuid } from "uuid";
import { ZodError, ZodIssue } from "zod";
import { GroupEnitiy } from "../../entities/group.entity/group.types";
import { groupFactory, GroupSchema } from "../../entities/group.entity/group.entity";

describe("group", () => {
	describe("group entity", () => {
		const newGroup: Omit<GroupEnitiy, "id" | "created_at"> = {
			admin_id: uuid(),
			name: "name",
			is_private: true,
			description: "some desc",
			profile_photo: new Blob(),
		};
		const newPlainGroup: Omit<GroupEnitiy, "id" | "created_at"> = {
			admin_id: uuid(),
			description: "some desc",
		};
		test("groupFactory create correct instance of the group object", () => {
			const group = groupFactory(newGroup);
			const plainGroup = groupFactory(newPlainGroup);

			expect(group.id).toBeDefined();
			expect(group.name).toStrictEqual(newGroup.name);
			expect(group.created_at).toBeInstanceOf(Date);
			expect(group.is_private).toStrictEqual(newGroup.is_private);
			expect(group.profile_photo).toBeInstanceOf(Blob);
			expect(group.profile_photo).toStrictEqual(newGroup.profile_photo);

			expect(plainGroup.id).toBeDefined();
			expect(plainGroup.name).toStrictEqual("Group");
			expect(plainGroup.created_at).toBeInstanceOf(Date);
			expect(plainGroup.is_private).toStrictEqual(true);
			expect(plainGroup.profile_photo).toBeUndefined();
		});
		test("newMessageSchema correctly parses message object", () => {
			const group = groupFactory(newGroup);
			const plainGroup = groupFactory(newPlainGroup);

			const parsedGroup = GroupSchema.parse(group);
			const parsedPlainGroup = GroupSchema.parse(plainGroup);

			expect(parsedGroup.id).toBeDefined();
			expect(parsedGroup.admin_id).toStrictEqual(group.admin_id);
			expect(parsedGroup.name).toStrictEqual(group.name);
			expect(parsedGroup.created_at).toBeInstanceOf(Date);
			expect(parsedGroup.created_at).toStrictEqual(group.created_at);
			expect(parsedGroup.is_private).toStrictEqual(group.is_private);
			expect(parsedGroup.description).toStrictEqual(group.description);
			expect(parsedGroup.profile_photo).toBeInstanceOf(Blob);
			expect(parsedGroup.profile_photo).toStrictEqual(group.profile_photo);

			expect(parsedPlainGroup.id).toBeDefined();
			expect(parsedPlainGroup.admin_id).toStrictEqual(plainGroup.admin_id);
			expect(parsedPlainGroup.name).toStrictEqual("Group");
			expect(parsedPlainGroup.created_at).toBeInstanceOf(Date);
			expect(parsedPlainGroup.created_at).toStrictEqual(plainGroup.created_at);
			expect(parsedPlainGroup.is_private).toStrictEqual(true);
			expect(parsedPlainGroup.description).toStrictEqual(plainGroup.description);
			expect(parsedPlainGroup.profile_photo).toBeUndefined();
		});
		test("newMessageSchema throws error when wrong message data is being parsed", () => {
			const wrongGroup = {
				admin_id: "not uuid",
				name: 2,
				created_at: "date",
				is_private: 3,
				description: "2",
				profile_photo: {},
			};
			const throwZodError = () => {
				try {
					GroupSchema.parse(wrongGroup);
				} catch (err) {
					throw new ZodError(err as ZodIssue[]);
				}
			};
			expect(throwZodError).toThrow(ZodError);

			expect(throwZodError).toThrow("id");
			expect(throwZodError).toThrow("admin_id");
			expect(throwZodError).toThrow("name");
			expect(throwZodError).toThrow("created_at");
			expect(throwZodError).toThrow("is_private");
			expect(throwZodError).toThrow("description");
			expect(throwZodError).toThrow("profile_photo");

			expect(throwZodError).toThrow("Required");
			expect(throwZodError).toThrow("Invalid uuid");
			expect(throwZodError).toThrow("Input not instance of Blob");
			expect(throwZodError).toThrow("Expected string, received number");
			expect(throwZodError).toThrow("Expected boolean, received number");
			expect(throwZodError).toThrow("String must contain at least 3 character(s)");
		});
	});
});
