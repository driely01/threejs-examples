import { useEffect, useRef } from "react";
import { textureGeometry } from "../utils/textureGeometry";

const GeometryTxt = () => {
	const canvasRef = useRef(null)
	useEffect(() => {
		if (canvasRef.current) {
			textureGeometry(canvasRef.current)
		}
	}, [])
	return (
		<div className="bg-black lg:w-[calc(100vw_-300px)] w-[calc(100vw_-100px)] text-white">
			<canvas
				ref={canvasRef}
				className="h-full w-full"
			>
				
			</canvas>
		</div>
	)
}

export default GeometryTxt;