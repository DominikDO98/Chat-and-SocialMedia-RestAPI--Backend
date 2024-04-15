import fs from "fs";

export const convertImg = (): Buffer => {
	const img = fs.readFileSync("src\\tests\\user.tests\\testingAssets\\image.png");
	return img;
};
