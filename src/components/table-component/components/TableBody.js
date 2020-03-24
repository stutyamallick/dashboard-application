import React from 'react';
import TableRow from './TableRow'

export default class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    render() {
        return (
            <tbody className="table-body">
                {this.props.data.map(
                    (rowData, i) => <TableRow 
                        key={i} 
                        data={rowData} 
                        rowInformation={this.props.columns}/>
                )}
            </tbody>
        )
    }
}