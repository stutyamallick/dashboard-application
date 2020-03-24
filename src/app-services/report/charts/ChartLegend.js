import React from 'react';

class ChartLengend extends React.Component {
    constructor(props){
        super(props);
        this.state = ({borderRadius: '50%'})
    }
    componentDidMount(){
        if(this.props.shape === 'square'){
            this.setState({borderRadius: '0%'})
        }
    }
    render() {
        return (
            <div>
                <br />
                <span className="app-legendImg" style={{ backgroundColor: this.props.fillColor, borderRadius: this.state.borderRadius }}></span>
                <span className="app-chartLegend">{this.props.displayName}</span>
            </div>
        );
    }
}

export default ChartLengend;