import React from 'react';
import { Card, ListGroup, Alert } from 'react-bootstrap';

interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

interface OrderProps {
  order: {
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  };
}

const OrderSummary: React.FC<OrderProps> = ({ order }) => {
  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Body>
        <h4 className="mb-4">Order Summary</h4>
        
        {order.items.length === 0 ? (
          <Alert variant="info">Your cart is empty</Alert>
        ) : (
          <>
            <ListGroup variant="flush">
              {order.items.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between">
                  <span>
                    {item.title} <small className="text-muted">x{item.quantity}</small>
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery:</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold border-top pt-2">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderSummary;