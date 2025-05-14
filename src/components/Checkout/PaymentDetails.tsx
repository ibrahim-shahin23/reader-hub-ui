import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    //  process the payment
    
    
    //show the success modal:
    setShowSuccessModal(true);
  };

  const handleViewOrders = () => {
    navigate('/myorders');
    setShowSuccessModal(false);
  };

  const handleReturnHome = () => {
    navigate('/');
    setShowSuccessModal(false);
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
                placeholder="1234 5678 9012 3456" 
                pattern="[0-9\s]{13,19}" 
                required 
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="MM/YY" 
                    pattern="\d{2}/\d{2}" 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="123" 
                    pattern="\d{3}" 
                    required 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button 
              variant="primary" 
              size="lg" 
              className="w-100 py-3 fw-bold mt-2"
              onClick={handleConfirmOrder}
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
          <Button 
           variant="primary" 
           onClick={() => navigate('/myorders')}
           >
           Open My Orders Page
          </Button>
          <Button variant="secondary" onClick={handleReturnHome}>
            Return to Homepage
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentDetails;