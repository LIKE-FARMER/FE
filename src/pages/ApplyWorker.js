import './styles/ApplyWorker.css';

function Apply(){
    const handleFileChange = (e) => {
           const file = e.target.files[0];
           const reader = new FileReader();
           reader.onloadend = () => {
          };
     reader.readAsDataURL(file);
    }
    return(
        <>
        
         <div className='Apply-form'>
            <h2>일꾼 지원서(예시 화면입니다)</h2>
            <h4>멋쟁이 농부처럼을 이용하여 손쉽게 일을 구해보세요!</h4>
            <p>외국인일 경우 재외국민등록증 첨부가 필수적입니다.</p>
            <p>건강한 농촌문화 형성을 위해 협조 부탁드립니다</p>
            <div className='form-main'>
              <p>* 이름: <input type='text'/></p>
              <p>* 나이: <input type='text'/></p>
              <p>* 내국인/외국인: <input type='text'/></p>
              <p>* 한국어 가능 여부: <input type='text'></input></p>
              <p>* (외국인일 경우) 이민자등록증 첨부하기 : <input type='file' onChange={handleFileChange}></input></p>
              <p>* 연락처: <input type='text'/></p>
            </div>
            <button onClick={()=>{alert("제출이 완료되었습니다.")}}>제출하기</button>
        </div>
        </>
    );
}
export default Apply;