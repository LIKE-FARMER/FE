import { useState,useEffect } from 'react';
import './styles/Home_Farm.css';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './styles/Search.css';
import axios from 'axios';


function TodayInfo(){
  const [tip, setTip] = useState();
  const tipArray = [
     "고추 아주심기는 늦서리가 끝난 후 맑은 날에 심는 것이 좋아요",
     "33도 이상은 열사병 위험이 있어 외출을 자제하세요",
     "치악산 복숭아 당도 최고 (광고임)",
     "광고",
     "광광고",
     "영농 꿀팁.."
  ];
  useEffect(() => {
    const tipNum = Math.floor(Math.random() * tipArray.length);
    setTip(tipArray[tipNum]);
  }, []);

  const navigate = useNavigate();
  return (
    <div className='todayinfo'>
    <div className='info'>
      <h4>오늘의 영농 꿀팁</h4>
      <hr/>
      <br/>
      <p>{tip}</p>
    </div>

    <div className='find'>
      <h4>일손이 부족하다면?</h4>
      <button onClick={()=>navigate('/findworker')}>여기를 클릭!</button>
    </div>
    </div>
  )
}

//검색하기
function Search_Main(){
  const navigate = useNavigate();
  const location = useLocation();
  const searchItem = location.state.search; //검색한 내용
  const [searchList, setSearchList]= useState([]);

    const getSearch = async ()=>{
        try {
            const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMyIsImlhdCI6MTY5MTkzNjM0OSwiZXhwIjo1NDI0NDE2MzQ5fQ.hk_VveWhENStASA9hIrDhoGUpAENRkOf0Ib6qKslPQs"; 
            const response = await axios.post('/user/post', 
            { keyword: searchItem }, 
              {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            if (response.data.status === 200) {
              setSearchList(response.data.users);
            }
          } catch (error) {
            console.log(error);
          }
    }
    useEffect(() => {
         getSearch();
    }, []);

  return(
    <div className='search-main'>
    <p><span style={{fontWeight :"bold",color: "rgb(54, 131, 24)"}}>{searchItem}</span>(을)를 키우시는 농부님들을 확인하세요!</p>
  
    <div className='sort'>
       <button>티어 높은 순</button>
       <button>최신 활동 순</button>
    </div>
      {searchList.length > 0 ? (
        <div>
          {searchList.map((a,i) => (
            <div className='search-text'key={i} >
            <img src={a.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
            <div className='search-col'>
            <h4>{a.name}</h4>
            <p>{a.nickname}</p>
            <p>{a.item}</p>
            </div>
            <p onClick={()=>{navigate('/card',{ state: { farmer: a.userId } })}}>클릭하여 명함 확인&nbsp;&nbsp;》</p>
          </div>
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
  </div>
  
  )
}
function Search(){
  
    return (
        <>
          <Header />
          <div className='search-whole'>
             <Search_Main/>
             <TodayInfo/>
          </div>
        </>
    );
}
export default Search;