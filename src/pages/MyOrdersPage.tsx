import { Container, Row, Col, Alert } from 'react-bootstrap';
import OrderCard from '../components/MyOrders/OrderCard';
import { useAppSelector } from '../redux/hooks';

const MyOrdersPage = () => {
  const orders = useAppSelector((state) => state.orders.orders);

  return (
    <Container className="my-5 py-4">
      <h1 className="mb-4">My Orders</h1>
      
      <Row>
        <Col lg={12}>
          {orders.length === 0 ? (
            <Alert variant="info">
              You haven't placed any orders yet.
            </Alert>
          ) : (
            orders.map((order) => (
              <OrderCard key={order.orderId} order={order} />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyOrdersPage;