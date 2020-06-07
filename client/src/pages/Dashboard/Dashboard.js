import React, { Component } from 'react';

import "./Dashboard.css"

import DashboardCard from "../../components/DashboardCard/DashboardCard"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    componentDidMount(){



        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"userhash": this.props.account});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch("http://localhost:3005/statistics", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));   

    }

    render() { 
        return (
            <div className="dashboard-div">
                <div className="dashboard-title">Dashboard</div>
                <div className="dashboard-content-div">
                    <DashboardCard  />
       

                </div>
            </div>
        );
    }
}
 
export default Dashboard;