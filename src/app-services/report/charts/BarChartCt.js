import React from 'react';
import { barChartUtility } from '../chart-utilities/BarChartUtility';

class BarChartCt extends React.Component {
    constructor(props) {
        super(props);
        this.state = { barChartData: [], barChartHeight: "", barChartWidth: "" }
    }
    componentDidMount() {
        this.setState({
            barChartData: [
                { "country": "INDIA", "customers": 40 },
                { "country": "JAPAN", "customers": 50 },
                { "country": "AUSTRALIA", "customers": 20 },
                { "country": "USA", "customers": 30 },
                { "country": "CHINA", "customers": 35 }
            ],
            barChartHeight: 188,
            barChartWidth: 530
        })
    }

    render() {
        barChartUtility(this.state.barChartData, this.state.barChartHeight, this.state.barChartWidth);
        return (
            <div>
                <div className="barChart_tooltip"></div>
                <div id="barChartCt"></div>
            </div>
        );
    }
}

export default BarChartCt;