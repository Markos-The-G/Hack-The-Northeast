import React, { Component } from 'react';

import "./Submission.css"
import bigInt from 'big-integer';

class Submission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price : "",
            data : {}
        }
    }
    componentDidMount(){
        var hash = decodeURI(this.props.hash)
        console.log(hash)
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"bountyName": hash});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/currentAmount", requestOptions)
          .then(response => response.text())
          .then(result => {
              
            // result is going to be lik this 0x0de0b6b3a7640000

            console.log(bigInt(parseInt(result, 16)));











            
                this.setState({price : result})

                console.log(result)


                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({"userhash": this.props.account ,"name": hash});
                
                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
                
                fetch("http://localhost:3005/searchBounty", requestOptions)
                  .then(response => response.text())
                  .then(result => {
                      console.log(JSON.parse(result))
                      this.setState({data : JSON.parse(result)})
                    })
                  .catch(error => console.log('error', error));











            })
          .catch(error => console.log('error', error));

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