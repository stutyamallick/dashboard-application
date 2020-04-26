import React from 'react';
import axios from 'axios';
// import TableComponent from '../../components/table-component/index'
const TableComponent = React.lazy(() => import('../../components/table-component/index'));

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { resultState: false, searchString: "", idType: "cid", customerData: [] };
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onIdChange = this.onIdChange.bind(this);
        this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
    }

    onSearchChange(event) {
        this.setState({ searchString: event.target.value });
    }
    onIdChange(event) {
        this.setState({ idType: event.target.value });
    }
    onSearchBtnClick() {
        var self = this;
        let params = {"paymentMode":"cc","pincode":"411021"};
        axios.post('http://localhost:8080/AJS_WebService/service/getDeliveryStatus', params)
        .then((response)=>{
            console.log(response)
        })
        fetch(`customerData.json`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((response) => {
                self.setState({ customerData: response.customerData, resultState: true });
            })        
    }

    render() {
        const customerTableColumn = [
            {header: "Customer ID", accessor: "customerId"},
            {header: "Customer Name", accessor: "customerName"},
            {header: "Net Cash Value", accessor: "netCash"},
            {header: "Unwind Date", accessor: "unwindDate"},
            {header: "OnBoard Status", accessor: "onBoardStatus"}
        ];
        const pageSize = ["5", "10", "25", "50"]
        return (
            <div>
                <div className="rowFlex searchCriteriaCt">
                    <span className="searchElementCt">
                        <select className="comboTypeSearch"
                            value={this.state.idType} onChange={this.onIdChange}>
                            <option value="pid">Parent Dealer ID</option>
                            <option value="cid">Customer ID</option>
                        </select>
                    </span>
                    <span className="searchElementCt">
                        <input type="text" className="textTypeSearch"
                            value={this.state.searchString}
                            onChange={this.onSearchChange} />
                    </span>
                    <span className="searchElementCt">
                        <button className="searchBtn" onClick={this.onSearchBtnClick}>Search</button>
                    </span>
                </div>
                <div>
                    {this.state.resultState
                        ? <div style={{margin: '5px', marginTop: '10px'}}>
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <TableComponent
                                    columns={customerTableColumn}
                                    data={this.state.customerData}
                                    pageSizeOption={pageSize}
                                    showPagination />
                            </React.Suspense>
                            </div>
                        : null
                    }
                </div>
            </div>

        );
    }
}

export default Home;