import React from 'react';
import { lineChartUtility } from '../chart-utilities/LineChartUtility';
import ChartLengend from './ChartLegend';

class LineChartCt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            legendData: [
                { "legendLabel": "Customers Joined", "legendColor": "#819e7e", "shape": "square" },
                { "legendLabel": "Customers Left", "legendColor": "#b7d48b", "shape": "circle" }
            ]
        }
    }
    componentDidMount() {
        let data = [
            { "date": "2019-01-01", "customersJoined": 19, "customersLeft": 9 },
            { "date": "2019-01-02", "customersJoined": 13, "customersLeft": 8 },
            { "date": "2019-01-03", "customersJoined": 12, "customersLeft": 1 },
            { "date": "2019-01-04", "customersJoined": 11, "customersLeft": 2 },
            { "date": "2019-01-05", "customersJoined": 16, "customersLeft": 4 },
            { "date": "2019-01-06", "customersJoined": 17, "customersLeft": 7 },
            { "date": "2019-01-07", "customersJoined": 20, "customersLeft": 3 },
            { "date": "2019-01-08", "customersJoined": 12, "customersLeft": 4 },
            { "date": "2019-01-09", "customersJoined": 10, "customersLeft": 10 },
            { "date": "2019-01-10", "customersJoined": 15, "customersLeft": 2 }
        ];
        this.setState({ data: data });
    }

    render() {
        lineChartUtility(this.state.data, this);
        return (
            <div className="rowFlex" style={{paddingLeft: '15%'}}>
                <div>
                    <div className="lineChart_tooltip"></div>
                    <div id="lineChartCt"></div>
                </div>
                <div style={{paddingLeft: '2%', paddingTop: '12%'}}>
                    {this.state.legendData.map(
                        (legendData, key) => <ChartLengend key={key}
                            fillColor={legendData.legendColor}
                            displayName={legendData.legendLabel}
                            shape={legendData.shape} />
                    )}
                </div>
            </div>
        );
    }
}

export default LineChartCt;