import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { useAuth } from './../AuthContext';
import { Link } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const location = useLocation();

  const userInfoFromLocation = location.state || {};
  const onClick = () => {
    search === '' ? alert("검색어를 입력하세요!") : navigate('/search', { state: { search: search } })
  }
  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      onClick();
    }
  }

  const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
  const { userId, token } = auth; // userId와 token을 분해할당합니다.
  const handleInfoButtonClick = () => {
    navigate('/info', { state: { userId: userId, token: token } });
  };


  return (

    <div className='header'>
      <Link to="/farm">LIKE <span className='a-plus'>FARMER</span></Link>
      <div className="search">
        <input
          type="text"
          placeholder="작물을 검색하세요. (ex. 감자)"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onKeyPress}
        />
        <button onClick={onClick}> ⌕ </button>
      </div>
      <div className='header-btn'>
        <button onClick={() => navigate('/farm')}><AiOutlineHome style={{ width: "30px", height: "30px", color: "gray" }} />홈</button>
        <button onClick={handleInfoButtonClick}><CgProfile style={{ width: "30px", height: "30px", color: "gray" }} />내 정보</button> {/*성민님 코드 연결*/}
        <button onClick={() => navigate('/findworker')}><MdOutlineWorkOutline style={{ width: "30px", height: "30px", color: "gray" }} />일꾼 구하기</button>
        <button onClick={() => navigate('/')}><BsBoxArrowRight style={{ fontWeight: "bolder", width: "30px", height: "30px", color: "gray" }} />처음으로</button>
      </div>
    </div>
  )
}
export default Header;