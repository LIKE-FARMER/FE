import React, { useState, useEffect } from 'react';
import './styles/Card.css';
import Header from './Header';
import img2 from './img/item.png';
import img3 from './img/locloc.png';
import img4 from './img/ring.png';
import img5 from './img/picpic.png';
import { useLocation } from 'react-router-dom';
import { useAuth } from './../AuthContext';

function Card() {
  const location = useLocation();

  const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
  const { userId, token } = auth; // userId와 token을 분해할당합니다.

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/user/profile/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle fetch error
      }
    };

    if (userId && token) { // userId와 token이 유효한 경우에만 fetchUserInfo 실행
      fetchUserInfo();
    }
  }, [userId, token]);

  return (
    <div className="Card">
      <Header />
      {userInfo ? <Boyd userInfo={userInfo} /> : null}
      <Lower />
    </div>
  );
}

function Boyd({ userInfo }) {
  return (
    <div className='containerCard'>
      <div className='card'>
        <div className='cardName'>
        {userInfo.image ? (
              <img className="userImg" alt="iconImg" src={userInfo.image} />
            ) : (
              <img className="userImg" alt="iconImg" src={img4} />
            )}
          <div>
            <div className='name'>{userInfo.name}[{userInfo.nickname}]</div>
            <div className='num'>{userInfo.phone}</div>
          </div>
        </div>
        <div className='cardInfo'>
          <div></div>
          <div></div>
          <div></div>
          <div className='num2'>{userInfo.phone} | <img className="icon" alt="iconImg" src={img4} /></div>
          <div className='item'>재배품목: {userInfo.item} | <img className="icon" alt="iconImg" src={img2} /></div>
          <div className='loc'>{userInfo.location} | <img className="icon" alt="iconImg" src={img3} /></div>
        </div>
      </div>
    </div>
  );
}

function Lower() {
  return (
    <div className="lower">
      <div className='lower'>
        <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 사자처럼(주)</p>
      </div>
    </div>
  );
}

export default Card;
