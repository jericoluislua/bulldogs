import React, {Component} from 'react';
import { Chart } from 'react-charts';
import {loadAllPlayerData} from "../../UserFunctions";
import '../../../App.css'


    class HeightDifferencePage extends Component {

        constructor(props){
            super(props);
            this.state = {
                players: [],
                errors: {}
            };

        }

        reloadData = () => {
            loadAllPlayerData().then(response => {
                this.setState({players: response.data});
            })
                .catch(err => console.log(err));

        };

        componentDidMount() {
            this.reloadData();
        }

        render() {

            let data = [
                {
                    label: "Players' heights",
                    data: this.state.players.map((p) => [p.firstName, p.height])
                }
            ];
            if (data[0].data.length === 0) {
                return null
            }
            console.log(data);

            const axes = [
                {primary: true, type: 'ordinal', position: 'bottom'},
                {type: 'linear', position: 'left'}
            ];

            let series = (
                {type: 'bar'}
            );

            const barChart = (
                // A react-chart hyper-responsively and continuously fills the available
                // space of its parent element automatically
                <div
                    className="chart"
                    style={{
                        width: '400px',
                        height: '300px'}}
                >
                    <Chart data={data}
                           axes={axes}
                           series={series}
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
                </div>
            )
    }
}
export default HeightDifferencePage;