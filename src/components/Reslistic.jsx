import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three'

function realisticTexture(canvas) {
	const width = canvas.clientWidth
	const height = canvas.clientHeight
	
	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
	camera.position.set(0, 0, 7)
	
	const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
	renderer.setSize(width, height);
	
	const contorls = new OrbitControls(camera, renderer.domElement)
	contorls.update()
	
	renderer.outputColorSpace = THREE.SRGBColorSpace
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.toneMappingExposure = 1.8
	
  const loader = new RGBELoader();
	loader.load('/HDR/MR_INT-004_BigWindowTree_Thea.pic', texture => {
		texture.mapping = THREE.EquirectangularReflectionMapping
		scene.background = texture
		scene.environment = texture
		
		const geometry = new THREE.SphereGeometry(1, 50, 50)
		const material = new THREE.MeshStandardMaterial({
			roughness: 0,
			metalness: 1, 
			color: 0xffd700
		})
		const sphere = new THREE.Mesh(geometry, material)
		scene.add(sphere)
	})
			function animate() {
				requestAnimationFrame(animate)
				contorls.update()
				renderer.render(scene, camera)
			}
			animate()
		}
		
		const Realistic = () => {
			const canvas = useRef(null)
			useEffect(() => {
				if (canvas.current)
					realisticTexture(canvas.current)
			}, [])
			
			return (
				<div className="lg:w-[calc(100vw_-300px)] w-[calc(100vw_-100px)]">
			<canvas ref={canvas} className="w-full h-full"></canvas>
		</div>
	)
}

export default Realistic;