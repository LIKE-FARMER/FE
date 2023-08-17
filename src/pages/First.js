import './styles/First.css';
import {useNavigate} from 'react-router-dom';
import bg from './styles/bg.jpg';

function First(){
    const navigate = useNavigate();
    return (
        <>
            <div className='first-bg'>
                <img src={bg}  style={{ width: "100vw", height: "100vh" }}></img>
            </div>
            <div className='first-txt'>
               <h1>멋쟁이 농부처럼</h1>
               <h4>LIKE FARMER</h4>
               <button onClick={()=>{navigate('/login')}}>농부로 시작하기</button>
               <button onClick={()=>{navigate('/guest')}}>게스트로 시작하기</button>
               <button onClick={()=>{window.open('http://localhost:3000/apply', '채용공고 올리기', 'resizable=no width=700 height=650');}}>일꾼 지원하기</button>
            </div>
        </>
    );
}
export default First;