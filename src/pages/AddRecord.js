import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { useAuth } from './../AuthContext';


function AddRecord() {
    const [record, setRecord] = useState({
        who: '',
        what: '',
        size: '',
        work: '',
        date: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/record', { ...record, userId }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => {
            alert('거래 내역이 성공적으로 추가되었습니다.');
            navigate(-1);
        })
        .catch(error => {
            console.error("거래 내역을 추가하는 중 오류가 발생했습니다:", error);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    return (
        <>
        <Header />
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="who"
                value={record.who}
                onChange={handleChange}
                placeholder="회사 이름"
            />
            <input 
                type="text"
                name="what"
                value={record.what}
                onChange={handleChange}
                placeholder="물품 이름"
            />
            <input 
                type="number"
                name="size"
                value={record.size}
                onChange={handleChange}
                placeholder="크기"
            />
            <input 
                type="text"
                name="work"
                value={record.work}
                onChange={handleChange}
                placeholder="작업 상태"
            />
            <input 
                type="date"
                name="date"
                value={record.date}
                onChange={handleChange}
                placeholder="날짜"
            />
            <button type="submit">추가하기</button>
        </form>
        </>
    );
}

export default AddRecord;
