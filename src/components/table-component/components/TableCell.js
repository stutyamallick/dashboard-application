import React from 'react';

export default class TableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    render() {
        return (
            <td>{this.props.data}</td>
        )
    }
}