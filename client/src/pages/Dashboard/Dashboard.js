import React, { Component } from 'react';

import "./Dashboard.css"

import DashboardCard from "../../components/DashboardCard/DashboardCard"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="dashboard-div">
                <div className="dashboard-title">Dashboard</div>
                <div className="dashboard-content-div">
                    <DashboardCard/>
                    <DashboardCard/>
                    <DashboardCard/>
                    <DashboardCard/>

                </div>
            </div>
        );
    }
}
 
export default Dashboard;