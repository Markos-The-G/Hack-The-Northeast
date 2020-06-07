import React, { Component } from 'react';

import "./Analytics.css"

import {RadialChart} from 'react-vis'



const myData = [{angle: 1, label : "100%-90%", color : "blue"}, {angle: 5, label : "90%-80%"}, {angle: 2, label : "80%-60%"}, {angle: 2, label : "60%-40%"}]

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"userhash":"0x5745975468AEd4Fd4f8932fD768EA3c6A3F0898c"});
        
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
            <div>
            <div className="find-bounty-title">Analytics</div>

            <RadialChart
            data={myData}
            width={300}
            height={300}
            labelsAboveChildren={true}
            showLabels={true}
            labelsRadiusMultiplier={1.2}
            />


            </div>
        );
    }
}
 
export default Analytics;