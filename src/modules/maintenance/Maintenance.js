import React from 'react';
import './maintenance-styles.css';

class MaintenanceMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comodityPrice: 100,
            amountPayable: '',
            paymentMode: 'debitCard',
            showChild: false,
            showProceedOption: true,
            paymentDone: false
        };
        this.maintenanceChildRef = React.createRef();
        this.onPaymentModeChange = this.onPaymentModeChange.bind(this);
        this.computeAmountPayable = this.computeAmountPayable.bind(this);
        this.onProceedBtnClick = this.onProceedBtnClick.bind(this);
        this.initiatePay = this.initiatePay.bind(this);
        this.onPayBtnClick = this.onPayBtnClick.bind(this);
        this.onStartOverClick = this.onStartOverClick.bind(this);
    }
    componentDidMount() {
        this.setState({ amountPayable: this.state.comodityPrice });
    }
    onPaymentModeChange(e) {
        let paymentModeSelected = e.target.value;
        this.setState({ paymentMode: paymentModeSelected });
        this.computeAmountPayable(paymentModeSelected);
    }
    computeAmountPayable(paymentModeSelected) {
        if (paymentModeSelected === "debitCard") {
            this.setState({ amountPayable: this.state.comodityPrice });
        } else if (paymentModeSelected === "creditCard") {
            this.setState({ amountPayable: this.state.comodityPrice + (0.05 * this.state.comodityPrice) });
        } else if (paymentModeSelected === "wallet") {
            this.setState({ amountPayable: this.state.comodityPrice + (0.10 * this.state.comodityPrice) });
        }
    }
    onProceedBtnClick() {
        this.setState({ showChild: true });
    }
    initiatePay(finalPrice) {
        this.setState({ amountPayable: finalPrice, showChild: false, showProceedOption: false })
    }
    onPayBtnClick() {
        this.setState({ paymentDone: true })
        this.props.history.push('./form')
    }
    onStartOverClick() {
        this.setState({ paymentDone: false, showProceedOption: true, 
            amountPayable: 100, paymentMode: 'debitCard' })
    }
    render() {
        return (
            <div>
                <div className="rowFlex maintenance-searchCriteriaCt">
                    {!this.state.paymentDone
                        ? <React.Fragment>
                            <div>
                                <span>
                                    <label className="elementLbl">Price of the Comodity: </label>
                                    <label className="priceLbl">{this.state.comodityPrice}</label>
                                </span>
                            </div>
                            <div className="searchElementCt colFlex">
                                <label className="elementLbl">Select payment mode</label>
                                <select className="comboTypeSearch" 
                                    value={this.state.paymentMode} onChange={this.onPaymentModeChange}>
                                    <option value="debitCard">Debit Card</option>
                                    <option value="creditCard">Credit Card</option>
                                    <option value="wallet">Wallet</option>
                                </select>
                                <span>
                                    <label className="elementLbl">Amount Payable: </label>
                                    <label className="priceLbl">{this.state.amountPayable}</label>
                                </span>
                            </div>
                            <div>
                                {this.state.showProceedOption
                                    ? <ProceedButton handleProceedClicked={this.onProceedBtnClick} />
                                    : <PayButton handlePayBtnClick={this.onPayBtnClick} />}
                            </div>
                        </React.Fragment>
                        : <PaymentDone handleStartOver={this.onStartOverClick} />}
                </div>
                <div>{this.state.showChild
                    ? <MaintenanceChild
                        amountPayable={this.state.amountPayable}
                        handleDoneClicked={this.initiatePay}
                        ref={this.maintenanceChildRef}>Child Block</MaintenanceChild> : null}</div>
            </div>
        );
    }
}
class ProceedButton extends React.Component {
    constructor(props) {
        super(props);
        this.onProceedBtnClick = this.onProceedBtnClick.bind(this);
    }
    onProceedBtnClick() {
        this.props.handleProceedClicked();
    }
    render() {
        return (
            <div className="searchElementCt colFlex">
                <label className="elementLbl" style={{ opacity: 0 }}>Blank</label>
                <button className="searchBtn" onClick={this.onProceedBtnClick}>Proceed</button>
            </div>
        );
    }
}
class PayButton extends React.Component {
    render() {
        return (
            <div className="searchElementCt colFlex">
                <label className="elementLbl" style={{ opacity: 0 }}>Blank</label>
                <button className="searchBtn" onClick={this.props.handlePayBtnClick}>Pay</button>
            </div>
        );
    }
}
class PaymentDone extends React.Component {
    render() {
        return (
            <div>
                <br />
                <label className="elementLbl">Your payment done successfully.</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="searchBtn" onClick={this.props.handleStartOver}>Start Over</button>
            </div>
        )
    }
}
class MaintenanceChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            couponCode: "",
            finalPayable: "",
            updatedPriceLbl: "",
            updatedPriceCt: false,
            couponApplied: false,
            showCouponSelector: true
        };
        this.onCouponCodeChange = this.onCouponCodeChange.bind(this);
        this.onApplyClicked = this.onApplyClicked.bind(this);
        this.onRemoveClicked = this.onRemoveClicked.bind(this);
        this.onDoneClicked = this.onDoneClicked.bind(this);
        this.app10Selected = this.app10Selected.bind(this);
        this.new25Selected = this.new25Selected.bind(this);
    }

    onCouponCodeChange(e) {
        this.setState({ couponCode: e.target.value })
    }
    onApplyClicked() {
        let couponCode = this.state.couponCode.toUpperCase();
        this.updatedPriceCalculation(couponCode);
    }
    
    app10Selected(){
        let couponCode = "APP10";
        this.updatedPriceCalculation(couponCode);
    }
    new25Selected(){
        let couponCode = "NEW25";
        this.updatedPriceCalculation(couponCode);
    }
    
    onRemoveClicked() {
        this.setState({ couponApplied: false, couponCode: "", updatedPriceCt: false, 
                        updatedPriceLbl: "", showCouponSelector: true })
    }
    onDoneClicked() {
        this.props.handleDoneClicked(this.state.finalPayable);
    }

    updatedPriceCalculation(couponCode){
        let amountPayable = this.props.amountPayable;
        let updatedPrice = amountPayable;

        if (couponCode === "APP10") {
            updatedPrice = amountPayable - (0.1 * amountPayable);
            this.setState({
                updatedPriceLbl: "Coupon code successfully applied. Updated Price is: " + updatedPrice,
                updatedPriceCt: true, finalPayable: updatedPrice, couponCode: 'APP10'
            })

        } else if (couponCode === "NEW25") {
            updatedPrice = amountPayable - (0.25 * amountPayable);
            this.setState({
                updatedPriceLbl: "Coupon code successfully applied. Updated Price is: " + updatedPrice,
                updatedPriceCt: true, finalPayable: updatedPrice, couponCode: 'NEW25'
            })

        } else {
            this.setState({
                updatedPriceLbl: "Invalid coupon code. Amount payable: " + updatedPrice,
                updatedPriceCt: true, finalPayable: updatedPrice
            })

        }

        this.setState({ couponApplied: true, showCouponSelector: false })
    }
    render() {
        return (
            <div>
                <div className="maintenanceChild-searchCriteriaCt">
                    {/* <label className="app-serviceTitle-child">{this.props.children}</label> */}
                    <div className="rowFlex">
                        <div className="colFlex">
                            <label className="elementLbl">Apply Coupon code</label>
                            <input type="text" className="textTypeSearch"
                                value={this.state.couponCode} onChange={this.onCouponCodeChange} />
                            <label>
                                {this.state.updatedPriceCt 
                                    ? <CouponApplyMessage msg={this.state.updatedPriceLbl} /> 
                                    : null}
                            </label>
                        </div>
                        <div>
                        {this.state.couponApplied
                            ? <CouponApplied
                                handleRemoveClick={this.onRemoveClicked}
                                handleDoneClick={this.onDoneClicked} />
                            : <ApplyCoupon
                                handleApplyClick={this.onApplyClicked} />}
                        </div>
                    </div>
                    {this.state.showCouponSelector
                    ? <CouponSelector 
                        app10Selected={this.app10Selected} 
                        new25Selected={this.new25Selected}/>
                    : null
                    }
                </div>
            </div>
        );
    }
}
class CouponApplyMessage extends React.Component {
    render() {
        return (
            <span className="coupondCodeMsgLbl">{this.props.msg}</span>
        );
    }
}
class ApplyCoupon extends React.Component {
    constructor(props) {
        super(props);
        this.onApplyClick = this.onApplyClick.bind(this);
    }
    onApplyClick() {
        this.props.handleApplyClick();
    }
    render() {
        return (
            <div className="searchElementCt colFlex">
                <label className="elementLbl" style={{ opacity: 0 }}>Blank</label>
                <button className="searchBtn" onClick={this.onApplyClick}>Apply</button>
            </div>
        );
    }
}
class CouponApplied extends React.Component {
    constructor(props) {
        super(props);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
    }
    onRemoveClick() {
        this.props.handleRemoveClick();
    }
    onDoneClick() {
        this.props.handleDoneClick();
    }
    render() {
        return (
            <div className="rowFlex">
                <div className="searchElementCt colFlex">
                    <label className="elementLbl" style={{ opacity: 0 }}>Blank</label>
                    <button className="searchBtn" onClick={this.onRemoveClick}>Remove</button>
                </div>
                <div className="searchElementCt colFlex">
                    <label className="elementLbl" style={{ opacity: 0 }}>Blank</label>
                    <button className="searchBtn" onClick={this.onDoneClick}>Done</button>
                </div>
            </div>
        );
    }
}
class CouponSelector extends React.Component{
    
    render(){
        return(
            <React.Fragment>
                <label className="elementLbl">Available Coupons- </label>
                <div className="rowFlex">
                    <div className="couponBoxCt" onClick={this.props.app10Selected}>
                        <label className="couponBoxText">APP10</label></div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="couponBoxCt" onClick={this.props.new25Selected}>
                        <label className="couponBoxText">NEW25</label></div>
                </div>
            </React.Fragment>
        )
    }
}
export default MaintenanceMain;