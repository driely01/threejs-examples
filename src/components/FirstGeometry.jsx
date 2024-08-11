import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MathUtils } from 'three'

function Box(props) {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
	const { viewport } = useThree()
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={MathUtils.clamp(viewport.width / 5, 0, 1.2) * active ? 1.4 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'green'} />
    </mesh>
  )
}

const FirstGeometry = () => {
	return (
		<div className="bg-black lg:w-[calc(100vw_-300px)] w-[calc(100vw_-100px)]">
			<Canvas>
				<ambientLight intensity={Math.PI / 2} />
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
				<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
				<Box position={[0, 1, 0]} />
				<Box position={[0, -1, 0]} />
			</Canvas>
		</div>
	)
}
export default FirstGeometry;