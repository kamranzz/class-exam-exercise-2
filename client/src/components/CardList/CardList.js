import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
import "./style.css"

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cards'); // Make sure the backend API URL is correct
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  return (
    <section class="blog-area section-gap" id="blog">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="menu-content pb-70 col-lg-8">
            <div class="title text-center">
              <h1 class="mb-10">Featured Robotics Products to Show</h1>
              <p>Who are in extremely love with eco friendly system.</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div className='cards no-border-card'>
            <Row gutter={[20, 16]}>
              {cards.map((card) => (
                <Col key={card._id} span={6}>
                  <img className='img-fluid-1' src={card.imageURL} alt={card.title} style={{ maxWidth: '100%' }} />
                  <Card className='no-border-card' title={card.title} style={{ width: 280 }}>
                    <p>{card.description}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </section>

  );
};

export default CardList;
