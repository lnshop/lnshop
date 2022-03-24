import PropTypes from 'prop-types'
import QRCode from "react-qr-code";

const LNPayment = (props: any) => {
  return (
    <div><QRCode value={props.invoice} /></div>
  )
}

LNPayment.propTypes = {
    invoice:PropTypes.string
}

export default LNPayment