import React from 'react';

export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.cityRef = React.createRef();
        this.modeRef = React.createRef();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('name: ',this.nameRef.current.value);
        console.log('city: ',this.cityRef.current.value);
        console.log('mode: ',this.modeRef.current.value);
    }

    render() {
        return (
            <div className="maintenanceFormCt">
                <label className="elementLbl">Please take a moment and fill the below form- </label>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td className="elementLbl" style={{width: '9em'}}>Enter your name: </td>
                                <td>
                                    <input type="text" className="textTypeSearch" 
                                    ref={this.nameRef} defaultValue="Rahul"
                                    required />
                                </td>
                            </tr>
                            <tr>
                                <td className="elementLbl" style={{width: '9em'}}>Enter your city: </td>
                                <td>
                                    <input type="text" className="textTypeSearch" 
                                    ref={this.cityRef} required />
                                </td>
                            </tr>
                            <tr>
                                <td className="elementLbl" style={{width: '9em'}}>Preferred mode: </td>
                                <td>
                                    <select className="comboTypeSearch" ref={this.modeRef} >
                                        <option value="debitCard">Debit Card</option>
                                        <option value="creditCard">Credit Card</option>
                                        <option value="wallet">Wallet</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <button type="submit" className="searchBtn">Submit</button>
                </form>
            </div>
        )
    }
}