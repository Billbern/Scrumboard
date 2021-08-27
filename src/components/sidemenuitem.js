import { NavLink } from "react-router-dom";

function SideMenuItem({name, link, icon}){
    
    return(
        <div className="w-full">
            {/* Links for the various pages with class & active class */}
            <NavLink className="inline-block w-full py-2 mb-2" exact to={link} activeClassName="border-r-4 bg-gray-200 border-off-blue-biased">
                <div className="flex items-center pl-8">
                    <span className="inline-block">{icon}</span>
                    <p className="ml-2 ">{name}</p>
                </div>
            </NavLink>
        </div>
    );
}


export default SideMenuItem;