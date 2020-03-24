import React from 'react';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import PaginationComponent from './components/Pagination'
import './themes/light-theme.css'

export default class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            columnHeaders: [],
            recordsPerPage: 10,
            tableData: [],
            pageIndex: 1
        })
    }

    componentDidMount() {
        let columnHeaders = [];
        let recordsPerPage = 0;
        let tableData = [];

        for (let i = 0; i < this.props.columns.length; i++) {
            columnHeaders.push(this.props.columns[i].header)
        }
        if (!this.props.showPagination) {
            recordsPerPage = this.props.data.length;
        } else {
            if (this.props.pageSizeOption !== undefined) {
                recordsPerPage = this.props.pageSizeOption[0];
            }
        }
        for (let i = 0; i < recordsPerPage; i++) {
            let obj = { ...this.props.data[i] }
            tableData.push(obj)
        }
        this.setState({ columnHeaders, recordsPerPage, tableData })
    }

    onPageSizeChange = (size) => {
        let start = this.state.recordsPerPage * (this.state.pageIndex - 1);
        let end = Number(start) + Number(size);
        let pageIndex = Math.floor((Number(start) / Number(size)) + 1);
        let tableData = [];
        console.log('size requested=', size, '    data  size=', this.props.data.length)
        console.log('start from inx=', start, '    end at inx=', end)
        if (Number(size) > (Number(this.props.data.length) - Number(start))) {
            console.log('will get less record than size requested')
        }
        if (Number(size) > Number(start)) { 
            start = 0; 
            end = start + size;
        }
        for (let i = start; i < end; i++) {
            if (i < this.props.data.length) {
                let obj = { ...this.props.data[i] }
                tableData.push(obj)
            }
        }
        this.setState({ recordsPerPage: size, tableData, pageIndex });
    }

    onPageChange = (type) => {
        let tableData = [];
        let pageIndex = 1;
        let start = 0;
        let end = 5;

        if (type === 'next') {
            pageIndex = this.state.pageIndex + 1;
            start = this.state.recordsPerPage * this.state.pageIndex;
            end = this.state.recordsPerPage * pageIndex;
        } else if (type === 'previous') {
            pageIndex = this.state.pageIndex - 1;
            start = this.state.recordsPerPage * (pageIndex - 1);
            end = this.state.recordsPerPage * pageIndex;
        }
        for (let i = start; i < end; i++) {
            if (i < this.props.data.length) {
                let obj = { ...this.props.data[i] }
                tableData.push(obj)
            }
        }

        this.setState({ tableData, pageIndex });
    }

    render() {
        return (
            <React.Fragment>
                <table className="main-table">
                    <TableHeader
                        headers={this.state.columnHeaders} />
                    <TableBody data={this.state.tableData} columns={this.props.columns} />
                </table>
                {this.props.showPagination
                    ? <PaginationComponent
                        pageSizeOption={this.props.pageSizeOption}
                        onPageSizeChange={this.onPageSizeChange}
                        onPageChange={this.onPageChange}
                        currentPage={this.state.pageIndex}
                        totalRecords={this.props.data.length} />
                    : null
                }
            </React.Fragment>
        )
    }
}