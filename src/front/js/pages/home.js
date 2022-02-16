import React from "react";
import "../../styles/home.scss";
import { UploadImage } from "../component/UploadImage";

export const Home = () => {
	return (
		<div className="text-center mt-5">
			<UploadImage />
		</div>
	);
};
