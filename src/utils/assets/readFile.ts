import fs from "fs";

export const convertImg = (): Buffer => {
	const img = fs.readFileSync("src/utils/assets/image.png");
	return img;
};
