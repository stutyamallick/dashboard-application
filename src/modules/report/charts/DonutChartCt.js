import React from 'react';
import { donutChartUtility } from '../chart-utilities/DonutChartUtility';
import ChartLengend from './ChartLegend';

class DonutChartCt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donutColor: ["#cb992d", "#725a93", "#a82d2f", "#0cc7c8"],
            data: [
                { "label": "Domain Mismatch", "value": 56 },
                { "label": "Sub-domain Mismatch", "value": 34 },
                { "label": "Policy Rejection", "value": 20 },
                { "label": "OS Failures", "value": 40 }
            ],
            legendData: [
                { "legendLabel": "Retail Customer", "legendColor": "#cb992d", "shape": "circle" },
                { "legendLabel": "Marketing Customer", "legendColor": "#725a93", "shape": "circle" },
                { "legendLabel": "Banking Customer", "legendColor": "#a82d2f", "shape": "circle" },
                { "legendLabel": "Technology Csutomer", "legendColor": "#0cc7c8", "shape": "circle" }
            ]
        }
    }
    componentDidMount() {
        let data = [
            { "label": "Retail Customer", "value": 55 },
            { "label": "Marketing Customer", "value": 15 },
            { "label": "Banking Customer", "value": 35 },
            { "label": "Technology Csutomer", "value": 40 }
        ];
        this.setState({ data: data });
    }

    render() {
        /* if(document.getElementById("donutChartCt") !== null){
            let newRadius = (document.getElementById("donutChartCt").clientWidth)/2.25;
            console.log('newRadius= ',newRadius)
            donutChartUtility(
                this.state.data, this.state.donutColor, newRadius);
        } */
        let radius = 120;
        donutChartUtility(
            this.state.data, this.state.donutColor, radius);
        return (
            <div className="rowFlex" style={{ paddingLeft: "15%" }}>
                <div className="flex-1">
                    <div className="donut_tooltip"></div>
                    <div id="donutChartCt"></div>
                </div>
                <div className="flex-1" style={{ paddingTop: "7.5%" }}>
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

export default DonutChartCt;