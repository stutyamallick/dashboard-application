import React from 'react';

export default class TableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    render() {
        return (
            <thead className="table-header">
                <tr>
                    {this.props.headers.map(
                        (header) => <th key={header}>{header}</th>)
                    }
                </tr>
            </thead>
        )
    }
}