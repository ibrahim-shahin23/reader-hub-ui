import React from 'react';
import { Container, Row, Col, Button, Form, Card, Image } from 'react-bootstrap';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { increaseQuantity, decreaseQuantity, removeItem } from '../../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  // Handlers that dispatch Redux actions
  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  return (
    <Container className="my-5 py-4">
      <h1 className="mb-4">Your Cart</h1>
      
      <Row>
        {/* Cart Items Column */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <h4>Your cart is empty</h4>
                  <p>Browse our collection to add books to your cart</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="d-flex mb-4 pb-4 border-bottom">
                    {/* Book Cover */}
                    <div className="me-4" style={{ width: '120px', flexShrink: 0 }}>
                      <Image 
                        src={item.coverImage} 
                        alt={item.title}
                        fluid
                        className="rounded shadow-sm"
                      />
                    </div>
                    
                    {/* Book Details */}
                    <div className="flex-grow-1">
                      <h4 className="mb-1">{item.title}</h4>
                      <p className="text-muted mb-1">by {item.author}</p>
                      <p className="text-muted mb-2">Publisher: {item.publisher}</p>
                      
                      {/* Quantity Controls */}
                      <div className="d-flex align-items-center mb-2">
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          className="px-2 py-1"
                          onClick={() => handleDecreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={12} />
                        </Button>
                        <span className="mx-3">{item.quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          className="px-2 py-1"
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          <FaPlus size={12} />
                        </Button>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button 
                          variant="link" 
                          className="text-danger p-0"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FaTrash /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary Column */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Order Summary</h4>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Discount:</span>
                  <span>-</span>
                </div>
                
                <div className="border-top pt-3 mb-4">
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100 py-3 fw-bold"
                  href="/checkout"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </div>
              
              {cartItems.length > 0 && (
                <div className="mt-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Promo Code</Form.Label>
                    <div className="d-flex">
                      <Form.Control 
                        type="text" 
                        placeholder="Enter promo code" 
                        className="me-2"
                      />
                      <Button variant="outline-secondary">Apply</Button>
                    </div>
                  </Form.Group>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;