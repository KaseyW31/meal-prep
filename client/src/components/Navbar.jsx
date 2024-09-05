import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
 return (
   <div className="container">
     <nav className="navbar navbar-light bg-light">
       <NavLink to="/" style={{"margin": "auto"}}>
        <FontAwesomeIcon icon={faPlateWheat} cursor="pointer" color="tomato" size="xl"></FontAwesomeIcon>
        <span style={{"fontFamily": 'garamond', "fontSize": 42, "color": "black"}}> minameal</span>
       </NavLink>
     </nav>
     <hr></hr>
   </div>
 );
}