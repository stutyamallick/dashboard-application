import React from 'react';

export default class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            pageSizeSelected: 0
        })
    }
    componentDidMount() {
        this.setState({ pageSizeSelected: this.props.pageSizeOption[0] })
    }

    onPageSizeChange = (e) => {
        this.props.onPageSizeChange(e.target.value)
        this.setState({ pageSizeSelected: e.target.value })
    }

    render() {
        var nextBtnDisabled = (this.props.currentPage * this.state.pageSizeSelected) >= this.props.totalRecords;
        var previousBtnDisabled = this.props.currentPage === 1;
        var btnClassName = "page-change-button";
        var disabledBtnClassName = "page-change-button-disabled";
        return (
            <div className="pagination-block-container">
                <div className="pagination-block-inner-container">
                    <div className="pagination-section">
                        {'Page Size:'} &nbsp;
                        <select className="pageSize-selector"
                            value={this.state.pageSizeSelected}
                            onChange={this.onPageSizeChange}>
                            {this.props.pageSizeOption.map(
                                (size) => <option key={size} value={size}>{size}</option>
                            )}
                        </select>
                    </div>
                    <div className="pagination-section">
                        <button
                            className={nextBtnDisabled ? disabledBtnClassName : btnClassName}
                            disabled={nextBtnDisabled}
                            onClick={() => this.props.onPageChange('next')}>{'Next'}</button>
                    </div>
                    <div className="pagination-section">
                        {'Page'} {this.props.currentPage} {'of'} {Math.ceil(this.props.totalRecords/this.state.pageSizeSelected)}
                    </div>
                    <div className="pagination-section">
                        <button
                            className={previousBtnDisabled ? disabledBtnClassName : btnClassName}
                            disabled={previousBtnDisabled}
                            onClick={() => this.props.onPageChange('previous')}>{'Previous'}</button>
                    </div>
                </div>
            </div>
        )
    }
}