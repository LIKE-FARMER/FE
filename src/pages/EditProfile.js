import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Button from 'react-bootstrap/Button';

function EditProfile() {
    const [profile, setProfile] = useState({
        nickname: "",
        location: "",
        phone: "",
        field: "",
        spec: "",
        license: ""
    });

    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, token } = location.state || {};

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                if (!userId || !token) {
                    console.error("userId 또는 token이 전달되지 않았습니다.");
                    return;
                }
                
                const response = await axios.get(`/user/profile/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
    
                if (response.data.status === 200) {
                    setProfile({
                        nickname: response.data.nickname,
                        location: response.data.location,
                        phone: response.data.phone,
                        field: response.data.field,
                        spec: response.data.spec,
                        license: response.data.license
                    });
                    setImage(response.data.image || "기본_이미지_링크");
                }
            } catch (error) {
                console.error("프로필 데이터를 가져오는데 오류가 발생했습니다:", error);
            }
        };
    
        fetchProfileData();
    }, [userId, token]);

    const handleInputChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.patch('/user/update',
                profile,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });

            if (image) {
                await handleUploadFile();
            }
            
            alert("프로필 업데이트 성공!");
            navigate(-1);
        } catch (error) {
            console.error(error);
            alert(`실패: ${error.response ? error.response.data.message : "Unknown error"}`);
        }
    };

    const handleUploadFile = async () => {
        try {
            const formData = new FormData();
            formData.append("file", image);

            const response = await axios.patch('/user/file', formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log(response);
        } catch (error) {
            console.error("파일 업로드 중 오류 발생:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div>
            <Header />
            <div className='profileInfoContainer'>
                <div className='create-post-form'>
                    <img src={typeof image === "string" ? image : (image ? URL.createObjectURL(image) : undefined)} alt="프로필 사진 미리보기" style={{ width: '100px', height: '100px' }} /><br />
                    <label>
                        프로필 사진:&nbsp;
                        <input type="file" name="image" onChange={handleFileChange} />
                    </label><br /><br />
                    <label>
                        이름:&nbsp;
                        <input type="text" name="nickname" value={profile.nickname} onChange={handleInputChange} />
                    </label><br /><br />
                    <label>
                        지역:&nbsp;
                        <input type="text" name="location" value={profile.location} onChange={handleInputChange} />
                    </label><br /><br />
                    <label>
                        전화번호:&nbsp;
                        <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} />
                    </label><br /><br />
                    <label>
                        땅 평수:&nbsp;
                        <input type="number" name="field" value={profile.field} onChange={handleInputChange} />
                    </label><br /><br />
                    <label>
                        작물:&nbsp;
                        <input type="text" name="spec" value={profile.spec} onChange={handleInputChange} />
                    </label><br /><br />
                    <label>
                        자격증:&nbsp;
                        <input type="text" name="license" value={profile.license} onChange={handleInputChange} />
                    </label><br /><br />
                    <Button variant="primary" onClick={handleUpdateProfile}>제출</Button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
