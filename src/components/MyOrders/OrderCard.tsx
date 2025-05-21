import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

interface OrderCardProps {
  order: {
    orderId: string;
    date: string;
    status: string;
    items: Array<{
      title: string;
      author: string;
      price: number;
      quantity: number;
      coverImage: string;
    }>;
    total: number;
    deliveryAddress: string;
  };
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <strong>Order #:</strong> {order.orderId}
          <br />
          <small className="text-muted">Placed on: {order.date}</small>
        </div>
        <Badge 
          bg={
            order.status === 'Delivered' ? 'success' :
            order.status === 'Shipped' ? 'primary' :
            'warning'
          }
        >
          {order.status}
        </Badge>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {order.items.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center">
              <img 
                src={item.coverImage} 
                alt={item.title}
                style={{ width: '50px', marginRight: '15px' }}
              />
              <div className="flex-grow-1">
                <h6 className="mb-1">{item.title}</h6>
                <small className="text-muted">by {item.author}</small>
              </div>
              <div className="text-end">
                <div>${item.price.toFixed(2)} x {item.quantity}</div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <div className="mt-3">
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <div className="mt-2">
            <strong>Delivery Address:</strong>
            <p>{order.deliveryAddress}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderCard;