import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { useControls } from "leva";
import { MathUtils } from "three";

function Light() {
	const axesCtl = useControls('Axes Helper', {
		visible: true,
		size: 5
	})

	const controlsCtl = useControls('Orbit Controls', {
		enabled: true,
		target: {
			x: 0,
			y: 0,
			z: 0
		},
		autoRotate: true,
		autoRotateSpeed: {
			value: Math.PI * 2,
			step: 0.1
		},
		enableZoom: true
	})

	const ambientCtl = useControls('Ambient Light', {
		visible: false,
		intensity: {
			value: 1.0,
			min: 0,
			max: 1.0,
			step: 0.1
		}
	})

	const directionalCtl = useControls('Directioal Light', {
		visible: true,
		position: {
			x: 3.3,
			y: 1.9,
			z: 0.02
		},
		castShadow: true
	})

	const spotCtl = useControls('Spot Light', {
		visible: true,
		intensity: 20,
		position: {
			x: -3.3,
			y: 6,
			z: 0.02
		},
		castShadow: true
	})

	return (
		<>
			<OrbitControls
				target={[controlsCtl.target.x, controlsCtl.target.y, controlsCtl.target.z]}
				enabled={controlsCtl.enabled}
				autoRotate={controlsCtl.autoRotate}
				enableDamping={true}
				autoRotateSpeed={controlsCtl.autoRotateSpeed}
				enableZoom={controlsCtl.enableZoom}
			/>
			<ambientLight
				visible={ambientCtl.visible}
				intensity={ambientCtl.intensity}
			/>
			<directionalLight
				visible={directionalCtl.visible}
				position={[directionalCtl.position.x, directionalCtl.position.y, directionalCtl.position.z]}
				castShadow={directionalCtl.castShadow}
			/>
			<spotLight
				visible={spotCtl.visible}
				intensity={spotCtl.intensity}
				position={[spotCtl.position.x, spotCtl.position.y, spotCtl.position.z]}
				castShadow={spotCtl.castShadow}
			/>
			<axesHelper
				visible={axesCtl.visible}
				args={[axesCtl.size]}
			/>
		</>
	)
}

function Sphere() {
	const { viewport } = useThree()
	return (
		<mesh
			scale={MathUtils.clamp(viewport.width / 5, 0, 1.2)}
			position={[0, 1.2, 0]}
			castShadow
		>
			<sphereGeometry />
			<meshStandardMaterial color='red' />
		</mesh>
	)
}

const ShadowsCtl = () => {
	return (
		<div className="h-screen bg-black lg:w-[calc(100vw_-300px)] w-[calc(100vw_-100px)]" >
			<Canvas camera={{ position: [4, 2, 10], fov: 60 }} shadows>
				<Light />
				<mesh rotation-x={-Math.PI / 1.9} receiveShadow >
					<circleGeometry args={[3.7]}/>
					<meshStandardMaterial color='red'/>
				</mesh>
				<Sphere />
				<Stats className="stats" />
			</Canvas>
		</div>
	)
}

export default ShadowsCtl;