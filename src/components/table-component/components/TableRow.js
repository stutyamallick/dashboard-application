import React from 'react';
import TableCell from './TableCell';

export default class TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    render() {
        return (
            <tr>
                {this.props.rowInformation.map(
                    (rowInfo, i) => <TableCell key={i} data={this.props.data[rowInfo.accessor]}/>
                    
                )}
            </tr>
        )
    }
}