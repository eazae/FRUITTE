import OrderInfo from './OrderInfo';
import styled from 'styled-components';

const PaymentWrapper = () => {
  return (
    <PaymentBox>
      <OrderInfo title="결제방식" />
      <OrderInfo title="카드정보" />
      <OrderInfo title="입금계좌" />
      <OrderInfo title="결제금액" />
    </PaymentBox>
  );
};

const PaymentBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default PaymentWrapper;
