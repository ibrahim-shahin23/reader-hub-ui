import React from 'react';
import { Card, ListGroup, Badge, Image } from 'react-bootstrap';

interface OrderItem {
  title: string;
  author: string;
  price: number;
  quantity: number;
  coverImage: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
  deliveryAddress: string;
}

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const statusVariant = order.status === 'Delivered' ? 'success' : 
                       order.status === 'Shipped' ? 'primary' : 'warning';

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <span className="fw-bold">Order #: {order.id}</span>
          <span className="text-muted ms-3">{order.date}</span>
        </div>
        <Badge bg={statusVariant}>{order.status}</Badge>
      </Card.Header>
      
      <Card.Body>
        <ListGroup variant="flush">
          {order.items.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center">
              <Image 
                src={item.coverImage} 
                alt={item.title}
                width={60}
                height={90}
                className="me-3"
                style={{ objectFit: 'cover' }}
              />
              <div className="flex-grow-1">
                <h6 className="mb-1">{item.title}</h6>
                <small className="text-muted">by {item.author}</small>
                <div className="mt-2">
                  <span className="me-3">Qty: {item.quantity}</span>
                  <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div className="mt-4">
          <h6>Delivery Address</h6>
          <p className="text-muted">{order.deliveryAddress}</p>
          
          <div className="d-flex justify-content-between border-top pt-3">
            <h5>Total:</h5>
            <h5>${order.total.toFixed(2)}</h5>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderCard;