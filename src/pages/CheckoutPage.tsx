import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import OrderSummary from '../components/Checkout/OrderSummary';
import PaymentDetails from '../components/Checkout/PaymentDetails';

const CheckoutPage = () => {
  // Mock order data
  const order = {
    items: [
      { title: "The Great Gatsby", quantity: 1, price: 12.99 },
      { title: "To Kill a Mockingbird", quantity: 2, price: 10.50 },
      { title: "1984", quantity: 1, price: 9.99 }
    ],
    subtotal: 43.98,
    deliveryFee: 3.99,
    total: 47.97
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