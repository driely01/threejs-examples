import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/Addons.js";

export const textureGeometry = (canvas) => {

	//get width and height
	const width = canvas.clientWidth
	const height = canvas.clientHeight

	//scene camera and renderer
	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000)
	camera.position.set(0, 5, 10)
	camera.lookAt(0, 0, 0)
	const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true})
	renderer.setSize(width, height)

	//loading texture
	const textureLoader = new THREE.TextureLoader();
	const ambientTexture = textureLoader.load('./textures/ambientOcclusion.png')
	const baseColorTexture = textureLoader.load('./textures/basecolor.png')
	const heightTexture = textureLoader.load('./textures/height.png')
	const normalTexture = textureLoader.load('./textures/normal.png')
	const roughnessTexture = textureLoader.load('./textures/roughness.png')
	const translucencyTexture = textureLoader.load('./textures/translucency.png')

	//add cube render target
	const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
		fromat: THREE.RGBFormat,
		generateMipmaps: true,
		minFilter: THREE.LinearMipMapLinearFilter,
		encoding: THREE.sRGBEncoding
	})
	const cubeCamera = new THREE.CubeCamera(1, 10000, cubeRenderTarget)

	//add geometry sphere and map textures on it
	const geometry = new THREE.SphereGeometry(2)
	const material = new THREE.MeshStandardMaterial({
		map: baseColorTexture,
		normalMap: normalTexture,
		roughnessMap: roughnessTexture,
		roughness: 0.5,
		displacementMap: heightTexture,
		displacementScale: 0.2,
		aoMap: ambientTexture,
		metalnessMap: translucencyTexture,
		metalness: 0.5,
		envMap: cubeRenderTarget.texture
	});
	const cube = new THREE.Mesh(geometry, material)
	cube.geometry.attributes.uv2 = cube.geometry.attributes.uv
	cube.add(cubeCamera)
	scene.add(cube)

	//add plane geometry
	const planeGeometry = new THREE.PlaneGeometry(22, 22)
	const planeMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff})
	const plane = new THREE.Mesh(planeGeometry, planeMaterial)
	plane.rotation.x = Math.PI / -2
	plane.position.set(0, -3, 0)
	scene.add(plane)

	//add contorls
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.autoRotate = true
	controls.enablePan = true
	controls.enableDamping = true
	controls.enableRotate = true
	controls.screenSpacePanning = false
	controls.keyPanSpeed = 8.0

	//add lights
	const upLight = new THREE.DirectionalLight(0xffffff, 3)
	upLight.position.set(0, 5,  0)
	scene.add(upLight)

	const blueLight = new THREE.DirectionalLight(0xffffff, 2)
	blueLight.position.set(-19, 0, -10)
	scene.add(blueLight)

	const redLight = new THREE.DirectionalLight(0xffffff, 2)
	redLight.position.set(0, -0.4, 0)
	scene.add(redLight)
	
	//animate the camera
	function animate() {
		const time = Date.now() * 0.0005
		upLight.position.x = Math.sin(time * 0.7) * 20
		upLight.position.z = Math.abs(Math.cos(time * 0.7)) * 20
		requestAnimationFrame(animate)
		controls.update()
		renderer.render(scene, camera)
		cubeCamera.update(renderer, scene)
	}
	animate()
}