import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OrderCard from '../components/MyOrders/OrderCard';

const MyOrdersPage = () => {
  // Mock orders data
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      status: 'Delivered',
      items: [
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          price: 12.99,
          quantity: 1,
          coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg"
        },
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          price: 10.50,
          quantity: 2,
          coverImage: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg"
        }
      ],
      total: 34.48,
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001"
    },
    {
      id: 'ORD-67890',
      date: '2023-05-10',
      status: 'Shipped',
      items: [
        {
          title: "1984",
          author: "George Orwell",
          price: 9.99,
          quantity: 1,
          coverImage: "https://m.media-amazon.com/images/I/81WunXq0HjL._AC_UF1000,1000_QL80_.jpg"
        }
      ],
      total: 13.98,
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001"
    }
  ];

  return (
    <Container className="my-5 py-4">
      <h1 className="mb-4">My Orders</h1>
      
      <Row>
        <Col lg={8}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MyOrdersPage;