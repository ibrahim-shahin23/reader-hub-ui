import React, { useState } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearCart } from '../../redux/slices/cartSlice';
import { addOrder } from '../../redux/slices/ordersSlice';

const PaymentDetails = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    // Get shipping address from form 
    const shippingAddress = "123 Main St, City, Country"; // Replace with actual address from form
    
    // Create the order
    dispatch(addOrder({
      items: [...cartItems],
      deliveryAddress: shippingAddress
    }));
    
    // Clear the cart
    dispatch(clearCart());
    
    // Show success modal
    setShowSuccessModal(true);
  };

  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h4 className="mb-4">Payment Details</h4>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control 
                type="text" 
                name="cardNumber"
                placeholder="1234 5678 9012 3456" 
                pattern="[0-9\s]{13,19}" 
                required 
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control 
                type="text" 
                name="expiryDate"
                placeholder="MM/YY" 
                pattern="\d{2}/\d{2}" 
                required 
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control 
                type="text" 
                name="cvv"
                placeholder="123" 
                pattern="\d{3}" 
                required 
                value={formData.cvv}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              size="lg" 
              className="w-100 py-3 fw-bold mt-2"
              onClick={handleConfirmOrder}
              disabled={cartItems.length === 0}
            >
              Confirm Order
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p style={{ color: 'green', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Order confirmed successfully!
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" onClick={() => navigate('/myorders')}>
            View My Orders
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Return to Homepage
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentDetails;