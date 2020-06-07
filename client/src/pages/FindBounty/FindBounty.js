import React, { Component } from 'react';

import "./FindBounty.css"

import BountyCard from "../../components/BountyCard/BountyCard.js"
import CircularProgress from '@material-ui/core/CircularProgress';

class FindBounty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : {},
            loading : true
        }
    }

    componentDidMount(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"userhash":"0xF6ADe377c46f995cF8A7329610a71541590bE4B4"});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3005/getAllBounties", requestOptions)
        .then(response => response.text())
        .then(result => {
            this.setState({data : JSON.parse(result), loading : false})
        })
        .catch(error => console.log('error', error));
    }

    // yo this shit is, im fucked i got my endpoint to ework, but the goddamn gay ass buffer api isn't working,fml
    render() {  
        console.log(this.state.data)
        return (
            <div className="find-bounty-div">
                <div className="find-bounty-title">Bounties</div>
                <div className="find-bounty-content-div">
                    {/* <BountyCard/>
                    <BountyCard/>
                    <BountyCard/>
                    <BountyCard/> */}
                    {/* {
                        Object.keys(dictionary).forEach(function(key) {
                            console.log(key, dictionary[key]);
                        });
                    } */}
                     {
                        this.state.loading 
                        ?
                        <CircularProgress/>
                        :
                        Object.keys(this.state.data).map((key, index) => ( 
                            <BountyCard data={this.state.data[key]} title={this.state.data[key].name} description={this.state.data[key].description} />
                        ))
                    }
                </div>
            </div>
        );
    }
}
 
export default FindBounty;