import React, { useState } from 'react';
import './styles/Login.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthContext';


function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const requestData = {
      id: id,
      pw: pw
    };
  
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login response:', data);
  
        // Set the received token and userId to the Auth context
        setAuth({
          userId: data.userId,
          token: data.tokenDto.accessToken
        });
  
        // Navigate to the next page with the received userId and token
        navigate('/farm', {
          state: {
            userId: data.userId,
            token: data.tokenDto.accessToken
          }
        });
  
      } else {
        const data = await response.json();
        setError(data.message || '로그인에 실패했습니다.');
        alert(data.message);
      }
  
    } catch (error) {
      setError('오류가 발생했습니다. 나중에 다시 시도해주세요.');
      alert("로그인에 실패했습니다.");
    }
  };
  

  return (
    <div className="Login">
      <Header />
      <Boyd setId={setId} setPw={setPw} handleLogin={handleLogin} />
      <Lower />
    </div>
  );
}

function Boyd({ setId, setPw, handleLogin }) {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <div className='item'></div>
      <div className='item'></div>
      <div className='item'></div>
      <div className='item'></div>
      <div className='loginContainer'>
        <div className='item_groupedBox'>
          <p className='LoginName'>Log in</p>
          <p className='side'>가입하신 아이디와 비밀번호를 입력해주세요.</p>
          <p>아이디</p>
          <div className="inputCom">
            <input
              type="text"
              className="userID"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <p>비밀번호</p>
          <div className="inputCom">
            <input
              type="password"
              className="userPW"
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <p></p>
          <input
            type="submit"
            value="로그인"
            className="loginBTN"
            onClick={handleLogin}
          />
        </div>
        <div className='signupContainer'>
          <p className='SignupName'>Sign up</p>
          <p>지금 Like Farmer의 회원이 되어보세요.</p>
          <input
            type="submit"
            value="회원가입"
            className="signupBTN"
            onClick={()=>{navigate('/signup')}}
          />
        </div>
        <div className='gog'>
        <p className='SignupName'>Announcement</p>
          <p>공지사항을 통해 더 많은 정보를 얻어보세요.</p>
          <input
            type="submit"
            value="공지사항"
            className="signupBTN"
          />
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

export default Login;
