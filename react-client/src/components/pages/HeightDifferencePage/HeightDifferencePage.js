import React, {Component} from 'react';
import { Chart } from 'react-charts';
import {loadAllPlayersHeights} from "../../UserFunctions";
import '../../../App.css'



/*
let data = [
        {
            label: "Players' heights",
            data: this.state.players
        }
    ];
*/



/*const barChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
        style={{
            width: '400px',
            height: '300px'
        }}
        className="chart"
    >
        <Chart data={data}
               axes={axes}
               series={series}
               tooltip
               /!*focus={}
               getDatums={}
               getLabel={}
               getPrimary={}
               getPrimaryAxisID={}
               getR={} getSecondary={}
               getSecondaryAxisID={}
               getSeriesID={}
               getSeriesOrder={}
               grouping={}*!//>
    </div>
);*/


const series = ({
    type: 'bar'
});


const axes = [
    {primary: true, type: 'ordinal', position: 'bottom'},
    {type: 'linear', position: 'left'}
];

const style = ({
    width: '400px',
    height: '300px'
});



    class HeightDifferencePage extends Component {

        constructor(props){
            super(props);
            this.state = {
                players: [],
                errors: {}
            };

        }







        reloadData = () => {
            loadAllPlayersHeights().then(response => {
                this.setState({players: response.data});
            })
                .catch(err => console.log(err));

        };


        componentDidMount() {
            this.reloadData();
        }



        render() {

            const data = [
                {
                    label: "Players' heights",
                    data: this.state.players
                }
            ];


            const barChart = (
                // A react-chart hyper-responsively and continuously fills the available
                // space of its parent element automatically
                <div
                    style={{
                        width: '400px',
                        height: '300px'
                    }}
                    className="chart"
                >
                    <Chart data={data}
                           axes={axes}
                           series={series}
                           style={style}
                           tooltip

                        /*focus={}
                        getDatums={}
                        getLabel={}
                        getPrimary={}
                        getPrimaryAxisID={}
                        getR={} getSecondary={}
                        getSecondaryAxisID={}
                        getSeriesID={}
                        getSeriesOrder={}
                        grouping={}*//>
                </div>
            );
            return(
                <div className="container">
                    <h1>Players' height difference</h1>
                    {barChart}
                    {console.log(this.state.players[0])}
{/*

                        {this.state.height.map((p, id) =>


*/}
                </div>
            )
    }
}
export default HeightDifferencePage;