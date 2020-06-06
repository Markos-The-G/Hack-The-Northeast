import React, { Component } from 'react';

import "./FindBounty.css"

import BountyCard from "../../components/BountyCard/BountyCard.js"

class FindBounty extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    // yo this shit is, im fucked i got my endpoint to ework, but the goddamn gay ass buffer api isn't working,fml
    render() {  
        return (
            <div className="find-bounty-div">
                <div className="find-bounty-title">Bounties</div>
                <div className="find-bounty-content-div">
                    <BountyCard/>
                    <BountyCard/>
                    <BountyCard/>
                    <BountyCard/>

                </div>
            </div>
        );
    }
}
 
export default FindBounty;