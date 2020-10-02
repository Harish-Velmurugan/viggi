import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

class PayPalBtn extends React.Component {
  
    render() {
      const { amount, onSuccess, currency, onCancel } = this.props;
        return (
            <PayPalButton
              amount={amount}
              currency={currency}
              onSuccess={(details, data) => onSuccess(details, data)}
              onCancel = {(data) => onCancel(data)}
              options={{
                clientId: "ARcHoWZ1p3VSdvYT3Jxd2X_GqkxHHMR65BdaEVYoJiiQO0IFUswhHCRTC5qEcXDCQSCzCWrePHUtP31g"
              }}
            />
        );
    }
}
export default PayPalBtn;