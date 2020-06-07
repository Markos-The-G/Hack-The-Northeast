import React, { Component } from 'react';

import "./Submission.css"

class Submission extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log(this.props.match.params.hash)
    }

    render() { 
        return (
            <div>
                SUBMISSION
            </div>
        );
    }
}
 
export default Submission;