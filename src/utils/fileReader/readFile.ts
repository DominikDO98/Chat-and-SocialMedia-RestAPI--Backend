import fs from "fs";

export const convertImg = async (): Promise<Buffer> => {
	const img = fs.readFileSync("src\\assets\\image.png");
	return img;
};
