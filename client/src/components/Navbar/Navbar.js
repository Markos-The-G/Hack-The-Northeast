import React, {useEffect} from 'react';

import {Link, useLocation} from 'react-router-dom'

import "./Navbar.css"

function Navbar(){
    // Gets the current route from react-router-dom
    const location = useLocation() 

    useEffect(() => {
        var route = (location.pathname).replace(/-/g, " ");
        route = route.split("/")
        route = route[1]

        var links = document.getElementsByClassName("navbar-link")

        for (var i = 0; i < links.length; i++){
            if (links[i].textContent.toLowerCase() === route){
                links[i].classList.add("active")
            }
            else{
                links[i].classList.remove("active")
            }
        }

    })
    
    return(
        <div className="navbar-div">
            <div className="navbar-inner-div">
                <div className="profile-div">
                    {/* <div className="navbar-profile-name">NAME</div> */}
                    <div style={{height: "100px"}}>
                        <img width="150" src="https://bountai-logo.adityakeerthi.repl.co/BountAI.png"></img>
                    </div>
                </div>
                <div className="navlinks-holder">
                    <div className="navlinks-container">
                        <Link to="/dashboard" className="navbar-link active">
                            Dashboard
                        </Link>
                        <Link to="/find-bounty" className="navbar-link"> 
                            Find Bounty
                        </Link>
                        <Link to="/create-bounty" className="navbar-link">
                            Create Bounty
                        </Link>
                        <Link to="/analytics" className="navbar-link">
                            Analytics
                        </Link>
                        <Link to="/history" className="navbar-link">
                            History
                        </Link>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


// class Navbar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }

//     // componentDidMount(){
//     //     let location = useLocation();
//     //     console.log(location.pathname);
//     // }

//     render() { 
//         return (
//         <div className="navbar-div">
//             <div className="profile-div">
//                 <div className="navbar-profile-picture"></div>
//                 <div className="navbar-profile-name">Dr. Makrizi</div>
//             </div>
//             <div className="navlinks-holder">
//                 <div className="navlinks-container">
//                     <Link to="/dashboard" className="navbar-link">
//                         Dashboard
//                     </Link>
//                     <Link to="/my-patients" className="navbar-link"> 
//                         My Patients
//                     </Link>
//                     <Link to="/clinics" className="navbar-link">
//                         Clinics
//                     </Link>
//                     <Link to="/analytics" className="navbar-link">
//                        Analytics
//                     </Link>
//                     <Link to="/settings" className="navbar-link">
//                        Settings
//                     </Link>
                    
//                 </div>
//             </div>
//         </div>
//         );
//     }
// }

export default Navbar;