import React from 'react';
import { Container, Row, Col, Button, Form, Card, Image } from 'react-bootstrap';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 3.99 : 0; // Only charge delivery if there are items
  const total = subtotal + deliveryFee;

  // Quantity handlers
  const handleIncreaseQuantity = (id: number | string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: number | string) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveItem = (id: number | string) => {
    dispatch(removeFromCart(id));
  };

  // If cart is empty, show empty cart message
  if (cartItems.length === 0) {
    return (
      <Container className="my-5 py-4">
        <h1 className="mb-4">Your Cart</h1>
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <h4 className="mb-3">Your cart is empty</h4>
            <p className="text-muted mb-4">Browse our collection and add some books to your cart!</p>
            <Button variant="primary" href="/">
              Start Shopping
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5 py-4">
      <h1 className="mb-4">Your Cart</h1>
      
      <Row>
        {/* Cart Items Column */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex mb-4 pb-4 border-bottom">
                  {/* Book Cover */}
                  <div className="me-4" style={{ width: '120px', flexShrink: 0 }}>
                    <Image 
                      src={item.coverImage} 
                      alt={item.title}
                      fluid
                      className="rounded shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x150/f3f4f6/64748b?text=Book+Cover';
                      }}
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
                      <span className="mx-3 fw-bold">{item.quantity}</span>
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
                      <p className="mb-0 fw-bold fs-5">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button 
                        variant="link" 
                        className="text-danger p-0"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FaTrash className="me-1" /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
                  <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''}):</span>
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
                  <div className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100 py-3 fw-bold"
                  href="/checkout"
                >
                  Proceed to Checkout (${total.toFixed(2)})
                </Button>
              </div>
              
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;