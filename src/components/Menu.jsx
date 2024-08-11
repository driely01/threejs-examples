import { Link,  } from "react-router-dom";

const Links = ({...props}) => {
	return (
		<Link to={props.path}>
			<div className="p-[8px] border-b border-gray-800">
				{props.name}
			</div>
		</Link>
	)
}
const Menu = () => {
	return (
		<div className="bg-gray-900 text-white h-screen lg:w-[300px] w-[100px]">
			<div className="text-center font-bold p-[8px] border-b border-gray-700">Examples</div>
			<div className="flex flex-col gap-[8px] p-[8px]">
				<Links path='/' name='shadow contorls' />
				<Links path='first' name='first geometry' />
				<Links path='earth' name='earth 3D model' />
			</div>
		</div>
	)
}

export default Menu;