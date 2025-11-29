import React from 'react';
import cartHouse from '../../../assets/images/house 2.jpg';

import type { House } from '../types/house';

const houses: House[] = [
  {
    id: 1,
    title: 'Дом',
    price: 500,
    status: 'Новое',
    rooms: 4,
    area: '120 м²',
    image: cartHouse,
  },
  {
    id: 2,
    title: 'Дом',
    price: 1000,
    status: 'Новое',
    rooms: 4,
    area: '150 м²',
    image: cartHouse,
  },
];

const PopularHouses: React.FC = () => {
  return (
    <section className='popular-house container'>
      <h1 className='popular-title'>Популярные участки</h1>

      <div className='house-content'>
        {houses.map((house) => (
          <div className='card-house' key={house.id}>
            <img className='card-house-images' src={house.image} alt={house.title} />

            <h2 className='card-house-title'>{house.title}</h2>

            <div className='house-price-status'>
              <p className='house-price'>{house.price} руб</p>
              <span className='house-status'>{house.status}</span>
            </div>

            <div className='house-info'>
              <p>Комнат: {house.rooms}</p>
              <p>Площадь: {house.area}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularHouses;
