import Header from './Header';
import { useState } from 'react';
import React from "react";
import Slider from "react-slick";
import './styles/slick.css';
import './styles/slick-theme.css';
import './styles/FindWorker.css';


function FindWorker_Main(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <nextArrow />,
        prevArrow: <prevArrow />,
      };
    const[worker,setWorker]= useState([1,2,3,4,5,6,7,8,9]);
    const[workerImg, setWorkerImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    return(
        <>
        <Slider {...settings}>
        {worker.map((a,i)=>(
            <div className='findworker-text' key={i}>
                <img src={workerImg}/>
                <div className='findworker-col'>
                    <h4>빠뜨란</h4>
                    <p>한국어 가능</p>
                    <p>감자 재배 경험</p>
                    <p className='s2'>재외국민 등록증 인증 완료</p>
                </div>
            </div>
        ))}
        </Slider>
        </>
    );
}
function FindWorker(){
    return(
        <>
        <Header/>
        <div className='findworker-title'>
          <p style={{padding:"13px",fontWeight:"bold"}}><span className='s1'>검증된</span>&nbsp;일꾼을 구해보세요</p>
          <p style={{fontSize:"15px"}}>불법체류 여부 검증을 통해 건강한 농촌 문화를 만들어요:{')'}</p>
        </div>
        <FindWorker_Main/>
        <div className="lower">
              <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 농부처럼(주)</p>
              <h2>LIKE FARMER</h2>
        </div>
        </>
    )
}
export default FindWorker;