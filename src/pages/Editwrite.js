import { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate,useLocation} from 'react-router-dom';
import './styles/write.css';

function CreatePost() {
    const [post, setPost] = useState({
        location: "",
        description: "",
    });
    const [image, setImage] = useState(null);  // 이미지용 별도 상태
    const [previewImage, setPreviewImage] = useState(null);  // 미리보기 이미지 URL용 상태
    const navigate = useNavigate();

    const location = useLocation();
    const postId = location.state.postId;
    const handleInputChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }
    const handleFormSubmit = async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjkxNTczMTUwLCJleHAiOjU0MjQwNTMxNTB9.FZimhlaTengZe-GN3433woPLkiyvGuyPoC6-d2BLROA"; // 실제 토큰으로 교체
    
            // 포스트 데이터를 보내기 위한 Axios 요청
            const postResponse = await axios.patch(`/post/${postId}/update`, 
            post, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
    
            console.log(postResponse);
            alert("글이 성공적으로 수정되었습니다!");
    
            let imageRequest = null;
            if (image) {    
                // 새 FormData 인스턴스 생성
                const formData = new FormData();
    
                // 파일을 FormData에 첨부
                formData.append('file', image);
    
                // 파일을 보내기 위한 Axios 요청
                imageRequest = await axios.patch(`/post/${postId}/file`, formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                });
    
                console.log(imageRequest);
                alert("이미지가 성공적으로 첨부되었습니다!");
            }
    
            navigate(-1);
    
        } catch (error) {
            console.error(error);
            alert(`실패: ${error.response ? error.response.data.message : "알 수 없는 오류"}`);
        }
    }
    


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        } else {
            setPreviewImage(null);
        }
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        handleFormSubmit();
    }

    return (
        <form>
            <Header />
            <div className='profileInfoContainer'>
                <div className='create-post-form'>
                    <label>
                        위치:&nbsp;
                        <input type='text' name="location" value={post.location} onChange={handleInputChange} />
                    </label><br /><br />
                    <label>
                        설명:&nbsp;
                        <textarea name="description" value={post.description} onChange={handleInputChange} />
                    </label><br /><br />
                    {/* 이미지 미리보기 */}
                    {previewImage && <img src={previewImage} alt="선택한 이미지 미리보기" style={{ width: '100px', height: '100px' }} />}
                    <label>
                        사진 첨부:&nbsp;
                        <input type="file" name="image" onChange={handleFileChange} />
                    </label><br /><br />
                    <button onClick={handleButtonClick}>제출</button>
                </div>
            </div>
        </form>
    );
}

export default CreatePost;