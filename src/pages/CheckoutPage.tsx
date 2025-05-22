import { Container, Row, Col } from 'react-bootstrap';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import OrderSummary from '../components/Checkout/OrderSummary';
import PaymentDetails from '../components/Checkout/PaymentDetails';
import { useAppSelector } from '../redux/hooks';

const CheckoutPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  const order = {
    items: cartItems.map(item => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price
    })),
    subtotal,
    deliveryFee,
    total
  };

  return (
    <Container className="my-5 py-4">
      <h1 className="mb-4">Checkout</h1>
      
      <Row>
        {/* Left Column - Customer Form */}
        <Col lg={7} className="mb-4">
          <CheckoutForm />
        </Col>
        
        {/* Right Column - Order Summary and Payment */}
        <Col lg={5}>
          <OrderSummary order={order} />
          <PaymentDetails />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;