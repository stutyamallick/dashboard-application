import React from 'react';
import './chart-styles.css';
import LineChartCt from './charts/LineChartCt';
import DonutChartCt from './charts/DonutChartCt';
import BarChartCt from './charts/BarChartCt';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "This page is currently under construction."
        }

    }

    render() {

        return (
            <div style={{backgroundColor: '#363636'}}>
                <div>
                    <LineChartCt></LineChartCt>
                </div>
                <div className="rowFlex">
                    <div className="flex-1">
                        <div className="reportTypeDescCt">
                            <label className="reportTypeDescText">Type of Customer</label>
                        </div>
                        <DonutChartCt></DonutChartCt>
                    </div>
                    <div className="flex-1">
                        <div className="reportTypeDescCt no-margin">
                            <label className="reportTypeDescText">Customer Country</label>
                        </div>
                        <BarChartCt></BarChartCt>
                    </div>
                </div>
            </div>
        );
    }
}

export default Report;