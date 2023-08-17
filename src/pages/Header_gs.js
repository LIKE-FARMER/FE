import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {AiOutlineHome} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import {MdOutlineWorkOutline} from 'react-icons/md';
import {BsBoxArrowRight} from 'react-icons/bs';

function Header(){
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const onClick = () =>{
      search==='' ? alert("검색어를 입력하세요!") : navigate('/search',{state: {search:search}})
    }
    const onKeyPress = (e)=>{
      if(e.key=='Enter'){
        onClick();
      }
    }
    return(
        
        <div className='header'>
        <a href="http://localhost:3000/guest">LIKE <span className='a-plus'>FARMER</span></a>
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
          <button onClick={()=>navigate('/guest')}><AiOutlineHome style={{ width: "30px", height: "30px",color: "gray" }}/>홈</button>
          <button onClick={()=>navigate('/')}><BsBoxArrowRight style={{ fontWeight:"bolder", width: "30px", height: "30px" ,color: "gray"}}/>처음으로</button>
        </div>
    </div>
    )
}
export default Header;