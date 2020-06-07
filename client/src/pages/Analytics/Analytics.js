import React, { Component } from 'react';

import "./Analytics.css"

import {RadialChart} from 'react-vis'


import {XYPlot, LineSeries, YAxis, XAxis, VerticalGridLines, HorizontalGridLines, HeatmapSeries, Sunburst} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

const myData = [{angle: 1, label : "100%-90%", color : "orange"}, {angle: 5, label : "90%-80%", color : "red"}, {angle: 2, label : "80%-60%"}, {angle: 2, label : "60%-40%"}]

var data = [
    {x: "May 27", y: 35},
    {x: "May 28", y: 45},
    {x: "May 29", y: 15},
    {x: "June 1", y: 25},
    {x: "June 2", y: 85},
    {x: "June 3", y: 55},
    {x: "June 4", y: 25},
    {x: "June 5", y: 95},
    {x: "Yesterday", y: 25},
    {x: "Today", y: 35},
]


const dataa = [
    {x: 1, y: 0, color: 10},
    {x: 1, y: 5, color: 10},
    {x: 1, y: 10, color: 6},
    {x: 1, y: 15, color: 7},
    {x: 2, y: 0, color: 12},
    {x: 2, y: 5, color: 2},
    {x: 2, y: 10, color: 1},
    {x: 2, y: 15, color: 12},
    {x: 3, y: 0, color: 9},
    {x: 3, y: 5, color: 2},
    {x: 3, y: 10, color: 6},
    {x: 3, y: 15, color: 12},
    {x: 4, y: 0, color: 3},
    {x: 4, y: 5, color: 6},
    {x: 4, y: 10, color: 2},
    {x: 4, y: 15, color: 6},
    {x: 5, y: 0, color: 4},
    {x: 5, y: 5, color: 5},
    {x: 5, y: 10, color: 12},
    {x: 5, y: 15, color: 1},
    {x: 6, y: 0, color: 3},
    {x: 6, y: 5, color: 9},
    {x: 6, y: 10, color: 2},
    {x: 6, y: 15, color: 5}
  ]


function updateData() {
    const totalLeaves = Math.random() * 20;
    const leaves = [];
    for (let i = 0; i < totalLeaves; i++) {
      const leaf = randomLeaf();
      if (Math.random() > 0.8) {
        leaf.children = [...new Array(3)].map(() => randomLeaf());
      }
      leaves.push(leaf);
    }
    return {
      title: '',
      color: 1,
      children: leaves
    };
}

function randomLeaf() {
    return {
      size: Math.random() * 1000,
      color: Math.random()
    };
  }

function getRandomData() {
const randomYData = [...new Array(100)].map(() =>
    Math.round(Math.random() * 40)
);
return randomYData.map((val, idx) => {
    return {x: idx, y: val};
});
}

  const DIVERGING_COLOR_SCALE = ['#00939C', '#85C4C8', '#EC9370', '#C22E00'];








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
            <div style={{display : 'flex', marginTop : "60px", flexWrap : "wrap", marginBottom : "80px"}}>
                <div className="circle-chart" style={{marginLeft: "100px"}}>
                    <div className="analytics-sub-title">Distribution of Accuracy</div>
                    <RadialChart
                    data={myData}
                    width={400}
                    height={400}
                    labelsAboveChildren={true}
                    showLabels={true}
                    margin={{left : 20}}
                    labelsRadiusMultiplier={1.2}
                    radius={150}
                    />
                </div>
                <div className="circle-chart" style={{marginLeft: "100px"}}>
                    <div className="analytics-sub-title">Frequency of Submissions</div>
                    <XYPlot 
                    height={280} 
                    width= {880}
                    xType="ordinal"
                    className="patient-view-mood-graph-timeline"
                    >
                            <XAxis />
                            <YAxis />
                            <LineSeries 
                            data={data}
                            color="#ff9833"
                            curve={'curveMonotoneX'}
                            animation="gentle"
                            />
                    </XYPlot>
                </div>
                <div className="circle-chart" style={{marginLeft: "100px", marginTop : "20px"}}>
                    <div className="analytics-sub-title" style={{width: "200px"}}>Concentration of Model Discrepancy</div>
                    <XYPlot
                    width={300}
                    height={300}>
                        <XAxis />
                        <YAxis />
                        <HeatmapSeries
                            colorRange={["#ff9833", "white"]}
                            className="heatmap-series-example"
                            data={dataa}/>
                    </XYPlot>
                </div>
                <div className="circle-chart" style={{marginLeft: "100px", marginTop : "20px"}}>
                    <div className="analytics-sub-title" style={{width: "200px"}}>Average Bounty Payout Evaluation</div>
                    <Sunburst
                    animation={{damping: 20, stiffness: 300}}
                    data={updateData()}
                    colorType={'category'}
                    colorRange={DIVERGING_COLOR_SCALE}
                    style={{stroke: '#fff'}}
                    onValueMouseOver={() => this.setState({hovering: true})}
                    onValueMouseOut={() => this.setState({hovering: false})}
                    height={300}
                    width={350}
                    />
                </div>
                <div className="circle-chart" style={{marginLeft: "100px", marginTop : "20px"}}>
                    <div className="analytics-sub-title" style={{width: "200px"}}>Bounty Interaction Usage Analysis</div>
                    <XYPlot width={300} height={300}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis title="X Axis" />
                    <YAxis title="Y Axis" />
                    <LineSeries className="first-series" data={getRandomData()} />
                    <LineSeries className="second-series" data={getRandomData()} />
                    </XYPlot>
                </div>
            </div>

            </div>
        );
    }
}
 
export default Analytics;