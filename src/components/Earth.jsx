import { useEffect, useRef, useState } from 'react'
import { create3DModel } from '../utils/model'

const Earth = () => {
	const canvasRef = useRef(null)
	const parentRef = useRef(null)

	const [width, setWidth] = useState(0);
	useEffect(() => {
		if (canvasRef.current) {
			create3DModel(canvasRef.current, 'planet')
			function handleResize() {
				setWidth(parentRef.current.clientWidth)
				create3DModel(canvasRef.current, 'planet')
			}
			addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
			}
		}
	}, [])

	return (
		<div ref={parentRef} className='bg-black lg:w-[calc(100vw_-300px)] w-[calc(100vw_-100px)]'>
			<canvas 
			ref={canvasRef} 
			style={{ width: width ? width : '100%' }} 
			className="h-full saturate-200"
		>
			
		</canvas>
		</div>
	)
}
export default Earth;