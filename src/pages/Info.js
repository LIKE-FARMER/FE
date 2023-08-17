import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/Home_Farm.css';

function ProfileInfo() {
    const [profile, setProfile] = useState({});
    const [records, setRecords] = useState([]);
    const [inventory, setInventory] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const userInfoFromLocation = location.state || {};
    const { userId, token } = location.state || {};

    useEffect(() => {
        if (userId && token) {
            axios.get(`/user/profile/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.data.status === 200) {
                        setProfile({
                            image: response.data.image || "기본_이미지_링크",
                            nickname: response.data.nickname,
                            location: response.data.location,
                            phone: response.data.phone,
                            field: response.data.field,
                            spec: response.data.spec,
                            license: response.data.license
                        });
                        setInventory(Array.isArray(response.data.items) ? response.data.items : []);
                        setRecords(response.data.records || []);
                    }
                })
                .catch(error => {
                    console.error("프로필 데이터를 가져오는데 오류가 발생했습니다:", error);
                });
        }
    }, [userId, token]);

    const deleteItem = (itemId) => {
        axios.delete(`/item/${itemId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            // 삭제 성공 시, inventory 상태 업데이트하여 삭제된 농작물 제거
            setInventory(inventory.filter(item => item.itemId !== itemId));
        })
        .catch(error => {
            console.error("농작물 삭제 중 오류가 발생했습니다:", error);
        });
    }

    const deleteRecord = (recordId) => {
        axios.delete(`/record/${recordId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            // 삭제 성공 시, records 상태 업데이트하여 삭제된 거래 내역 제거
            setRecords(records.filter(record => record.recordId !== recordId));
        })
        .catch(error => {
            console.error("거래 내역 삭제 중 오류가 발생했습니다:", error);
        });
    }
    

    return (
        <>
            <Header />
            <div className='profileInfoContainer'>
                <div className='profileBox'>
                    <img src={profile.image} alt="profile" className='profileImage' />
                    <hr />
                    <p className='name'>{profile.nickname}</p>
                    <p className='location'>{profile.location}</p>
                    <p className='phone'>{profile.phone}</p>
                    <p className='field'>{profile.field}</p>
                    <p className='crops'>{profile.spec}</p>
                    <p className='status'>{profile.license}</p>
                    <button onClick={() => navigate('/edit-profile', {
                        state: { userId, token }
                    })}>수정하기</button>

                </div>

                {/* 인벤토리 부분은 그대로 유지하였습니다. */}
                <div className='inventoryBox'>
                    <h3>현재 농작물 상태</h3>
                    <hr />
                    {inventory.map(item => (
                        <p key={item.itemId}>
                            {item.title}🍎: {item.gram}g
                            <Link
                                to={`/edit-inventory?itemId=${item.itemId}`}
                                state={{
                                    itemId: item.itemId,
                                    title: item.title,
                                    gram: item.gram
                                }}
                            >
                                <button>수정하기</button>
                            </Link>
                            <button onClick={() => deleteItem(item.itemId)}>삭제하기</button>
                        </p>
                    ))}
                    <Link to="/add-inventory">
                        <button>농작물 추가하기</button>
                    </Link>
                </div>
                <div className='recordsBox'>
                    <h3>거래 내역</h3>
                    {records.map(record => (
                        <div className='recordItem' key={record.recordId}>
                            <hr />
                            <p><strong>거래 ID:</strong> {record.recordId}</p>
                            <p><strong>거래 날짜:</strong> {record.createdAt}</p>
                            <p><strong>업데이트 날짜:</strong> {record.updatedAt}</p>
                            <p><strong>회사:</strong> {record.who}</p>
                            <p><strong>물품:</strong> {record.what}</p>
                            <p><strong>크기:</strong> {record.size}</p>
                            <p><strong>상태:</strong> {record.status === 1 ? '활성' : '비활성'}</p>
                            <p><strong>작업:</strong> {record.work}</p>
                            <p><strong>데이터:</strong> {record.data}</p>
                            <button onClick={() => deleteRecord(record.recordId)}>거래 내역 삭제하기</button>
                        </div>
                    ))}
                    <button onClick={() => navigate('/add-record', {
                        state: { userId, token }
                    })}>거래 내역 추가하기</button>

                </div>
            </div>
        </>
    );
}

export default ProfileInfo; 