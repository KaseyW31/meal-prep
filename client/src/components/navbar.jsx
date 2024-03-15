// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 // Here, we display our Navbar
export default function Navbar() {
 return (
   <div className="container">
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <img style={{"width" : 10 + '%'}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F396%2F563%2Foriginal%2Fvector-illustration-of-a-radish.jpg&f=1&nofb=1&ipt=20c5bd56e0e818b05ac795cba836d742f51b6856c8aca06ce7e73cc4b71783f1&ipo=images"></img>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create/ingredient">
               Create Ingredient
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/create/meal">
               Create Meal
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}