import React from 'react';

import houseSvg from '../assets/icons/house.svg';
import flagSvg from '../assets/icons/flag.svg';
import houseBlue from '../assets/icons/houseBlue.png';

const ServicesCard: React.FC = () => {
  return (
    <section className='card-container container'>
      <h1 className='card-container-title'>Посмотри что мы можем</h1>

      <div className='card-content'>
        <div className='card'>
          <img src={houseSvg} alt='Аренда' className='card-icon' />
          <h2 className='card-title'>Арендовать дом</h2>
          <p className='card-text'>Арендуй дом по низким ценам</p>
          <button className='button-rent'>Арендовать</button>
        </div>

        <div className='card'>
          <img src={flagSvg} alt='Инфо' className='card-icon' />
          <h2 className='card-title'>Информация</h2>
          <p className='card-text'>Получи информацию о доме которая тебя интересует</p>
          <button className='button-info'>Получить информацию</button>
        </div>

        <div className='card'>
          <img src={houseBlue} alt='Купить' className='card-icon' />
          <h2 className='card-title'>Купить дом</h2>
          <p className='card-text'>Выбери дом своей мечты</p>
          <button className='button-buy'>Купить дом</button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCard;
