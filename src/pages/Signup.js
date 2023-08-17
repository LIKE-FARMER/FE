import React, { useState } from 'react';
import './styles/Signup.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const requestData = {
      id: id,
      pw: pw,
      name: name,
      nickname: nickname,
      location: location,
    };

    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup response:', data);
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      setError('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className="Signup">
      <Header />
      <div className='container3'>
        <div></div>
        <div className='div2'></div>
        <div></div>
        <div></div>
        <div className='div5'>
          <form onSubmit={handleSignup}>
            <p className='pageName'>Sign up</p>
            <p>이름</p>
            <div className="inputCom">
              <input
                type="text"
                className="nameID"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <p>아이디</p>
            <div className="inputCom">
              <input
                type="text"
                className="ID"
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <p>비밀번호</p>
            <div className="inputCom">
              <input
                type="password"
                className="PW"
                onChange={(e) => setPw(e.target.value)}
                required
              />
            </div>
            <p>지역</p>
            <div className="inputCom">
              <input
                type="text"
                className="LOC"
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <p>닉네임</p>
            <div className="inputCom">
              <input
                type="text"
                className="nick"
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
            <p></p>
            <input
              type="submit"
              value="가입하기"
              className="signupBTNN"
              
            />
          </form>
        </div>
        <div></div>
      </div>
      <div className="lower">
        <div className='lower'>
          <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 사자처럼(주)</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
