import Shipping from './components/Shipping';
import OrderTitle from './components/OrderTitle';
import Payment from './components/Payment';
import ProductInfo from './components/Product';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// order-content dummy data
const OrderContentDummy = {
  orderNumber: '',
  product: {
    name: '목감기에 좋은 건더기 없는 프리미엄 수제 착즙 유자청',
    img: 'https://cdn.imweb.me/thumbnail/20220610/7902f9ea75514.jpg',
    option: '유자청 1kg 1병',
    price: 15000,
    discount: 13300,
    delivery_fee: 3500,
    isDiscount: true,
  },
  payment_info: {
    method: true, // true = 카드결제, false = 무통장입금
    total: 16800,
    card: '1234 5678 9101 1121',
    account: {
      bank: '국민은행',
      number: '527837-01-004676',
      name: '주식회사 로컬앤라이프',
    },
  },
  orderer: {
    name: '추승연',
    contact: '010-1234-5678',
    isRegistered: false, // true = 회원, false = 비회원
  },
  shipping: {
    postcode: 1234,
    method: '택배',
    address: '서울시 양천구 신정3동 신정로7길 60-7',
    detail: '402 - 701',
    req: '부재시 경비실에 맡겨주세요.',
  },
};

const OrderContent = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <OrderTitle orderInfo={OrderContentDummy} />
      <ProductInfo orderInfo={OrderContentDummy} />
      <Payment orderInfo={OrderContentDummy} />
      <Shipping orderInfo={OrderContentDummy} />
      <RedirectButton onClick={() => navigate('/')}>홈으로</RedirectButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RedirectButton = styled.button`
  width: 40%;
  background-color: ${props => props.theme.ownColor};
  color: ${props => props.theme.boxColor};
  margin: 10px;
  &:hover {
    background-color: ${props => props.theme.ownColorHover};
  }
`;

export default OrderContent;