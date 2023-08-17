import { useState, useEffect } from 'react';
import './styles/Home_Farm.css';
import Header from './Header';
import { BiEdit } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import img3 from './img/locloc.png';
import { useAuth } from './../AuthContext';


//1. 프로필 (완료)
function HomeProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfoFromLocation = location.state || {};
    const [homeProfile, setHomeProfile] = useState({
        name: '',
        nickname: '',
        image: '',
        item: '',
    });
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.

    const handleCardButtonClick = () => {
        navigate('/Card', { state: { userId: userId, token: token } });
    };
    const handleInfoButtonClick = () => {
        navigate('/info', { state: { userId: userId, token: token } });
    };

    useEffect(() => {
        const getHomeProfile = async () => {
            try {
                const response = await axios.get('/user/home', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                if (response.status === 200) {
                    setHomeProfile({
                        name: response.data.user.name,
                        nickname: response.data.user.nickname,
                        img: response.data.user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                        item: response.data.user.item,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        getHomeProfile();
    }, []);

    return (
        <div className='profile'>
            <img className='profile-img ' src={homeProfile.img} />
            <h4>{homeProfile.name} 농부님 어서오세요!</h4>
            <hr></hr>
            <p>{homeProfile.nickname}</p>
            <p>⛤{homeProfile.item} 풀스택⛤</p>
            <button className='profile-btn-card' onClick={handleCardButtonClick}>내 명함</button>
            <button onClick={handleInfoButtonClick} className='profile-btn-edit'><BiEdit style={{ width: "20px", height: "20px", color: "gray" }} />수정하기</button>
        </div>
    )
}

//2. 글 
function Board_Post() {
    const navigate = useNavigate();
    //(1)전체 글 보이기(완료)
    const [postList, setPostList] = useState([]);
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.
    const getAllPost = async () => {
        try {

            const response = await axios.get('/post', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            if (response.data.status === 200) {
                setPostList(response.data.postList);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllPost();
    }, []);


    //(2) 글 삭제하기 (완료)
    const deletePost = async (postId) => {
        const shouldDelete = window.confirm("정말로 글을 삭제하시겠습니까?");
        if (shouldDelete) {
            try {
                const response = await axios.delete(`/post/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    console.log(response);
                    setPostList(prevPostList => prevPostList.filter(post => post.postId !== postId));
                } else {
                    alert('삭제에 실패했습니다.');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    /////////////////////////////////////////////

    const [editID, setEditID] = useState(1);
    const [showCommentID, setShowCommentID] = useState(1);


    const clickEditBtn = postId => { //글수정
        setEditID(postId);
        navigate('/edit-write', { state: { postId: postId } })
    }

    const clickshowBtn = id => { //댓글보기
        setShowCommentID(id);
        setShowTF(!showTF);
    }
    const [showTF, setShowTF] = useState(false);
    /////////////////////////////////////////////
    return (
        <>
            <div className='board-total'>
                <p>나의 영농 일지</p>
                <button onClick={() => { navigate('/write') }}>오늘은 무슨일이 있었나요?</button>
                {/*전체 글 보여주기*/}
                {postList.map((a, i) => (
                    <div key={i}>
                        <div className='board-post'>
                            <div className='board-text'>
                                <div className='board-text-title'>
                                    <img style={{ width: "18px", height: "18px" }} src={img3} />
                                    <p style={{ fontWeight: "bold" }}>{a.location}</p>
                                    <p>작성: {a.createdAt} | </p>
                                    <p>수정: {a.updatedAt}</p>
                                </div>
                                <div className='board-text-btn'>
                                    <button onClick={() => clickEditBtn(a.postId)}>수정하기</button>
                                    <button onClick={() => deletePost(a.postId)}>삭제하기</button>
                                </div>
                            </div>
                            <div className='board-text-main' key={i}>
                                <img src={a.image} style={{ width: "650px", height: "270px", marginTop: "20px" }} />
                                <p>{a.description}</p>
                            </div>
                            <hr style={{ width: "400px", marginTop: "30px", marginBottom: "30px" }} />
                            <button className="show" onClick={() => clickshowBtn(a.postId)}>댓글보기</button>
                            <Post_Comment postId={a.postId} />
                        </div>
                        {showTF && showCommentID === a.postId ? <Show_Comment postId={a.postId} /> : null}
                    </div>
                ))}
            </div>
        </>
    )
}
//3. 댓글 (1)댓글 달기 
function Post_Comment(props) {
    const [postCommentData, setPostCommentData] = useState({
        nickname: '',
        password: '',
        content: '',
        postId: props.postId,
    });
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.
    const postComment = async () => {
        try {

            const response = axios.post(`/comment/${props.postId}`,
                postCommentData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
            console.log(response);
            alert('댓글달기에 성공하셨습니다');
        } catch (error) {
            console.log(error);
        }
    }
    //////////////////////////////////////
    return (
        <div className='board-comment'>
            <input
                type='text'
                placeholder='닉네임'
                onChange={(e) => {
                    setPostCommentData({ ...postCommentData, nickname: e.target.value });
                }}
            />
            <input
                type='password'
                placeholder='비밀번호'
                onChange={(e) => {
                    setPostCommentData({ ...postCommentData, password: e.target.value });
                }}
            />
            <br />
            <input
                className='comment-text'
                type='text'
                placeholder='댓글을 입력해주세요'
                onChange={(e) => {
                    setPostCommentData({ ...postCommentData, content: e.target.value });
                }}
            />

            <button
                onClick={async (e) => {
                    e.preventDefault();
                    postComment();
                }}
            >등록하기</button>
        </div>
    );

}

//3. 댓글 (2)댓글 보여주기
function Show_Comment(props) {
    const [commentList, setCommentList] = useState([]);
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.
    useEffect(() => {
        const getComment = async () => {
            try {

                const response = await axios.get(`/comment/${props.postId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                setCommentList(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        getComment();
    }, [])
    //(2)-1 댓글 삭제하기
    const deleteComment = async (commentId) => {

        const passwordInput = prompt("댓글을 삭제하려면 비밀번호를 입력하세요:");
        if (passwordInput !== null) {
            try {
                const response = await axios.delete(`/comment/${props.postId}/${commentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        password: passwordInput
                    }
                });
                if (response.data.status === 200) {
                    console.log(response.data.message);
                    alert('댓글이 삭제되었습니다.');
                    setCommentList(commentList.filter(comment => comment.commentId !== commentId));
                } else {
                    alert('비밀번호가 틀립니다.');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    //////////////////////////////////////
    return (
        <>
            {commentList.length > 0 ? (
                commentList.map((a, i) => (
                    <div className='comm' key={i}>
                        <p>{a.nickname}</p>
                        <p>{a.content}</p>
                        <button onClick={() => deleteComment(a.commentId)}>삭제하기</button>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: "center" }}>댓글이 없습니다.</p>
            )}
            <hr style={{ width: "500px", borderTop: "1px dashed #bbb", marginBottom: "30px" }}></hr>
        </>
    );
}

//4. 티어 정보(완료)
function Tier() {
    const [tier, setTier] = useState('');
    const [myTier, setMyTier] = useState('');
    const { auth } = useAuth(); // AuthContext에서 auth 상태를 가져옵니다.
    const { userId, token } = auth; // userId와 token을 분해할당합니다.

    useEffect(() => {
        const getTier = async () => {
            try {
                const userId = 2;
                const response = await axios.get(`/user/profile/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                if (response.data.status === 200) {
                    setTier(response.data.tier);
                    tier === 1 ? setMyTier("아기농부") : tier === 2 ? setMyTier("열정농부") : tier === 3 ? setMyTier("마스터농부") : setMyTier('');
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTier();
    });
    return (
        <div className='level'>
            <h4>티어 정보</h4>
            <p>당신은 <span style={{ fontWeight: "bold", color: "rgb(54, 131, 24)" }}>{myTier}</span>입니다!</p>
            <hr />
            <p>레벨 업을 하기 위해서는</p>
            <p>* 아기농부 ➡️ 열정농부<br />: 프로필 사진을 올려주세요!</p>
            <p>* 열정농부 ➡️ 마스터농부<br />: 글을 작성해주세요!</p>
        </div>
    )
}

function HomeFarm() {
    return (
        <>
            <Header />
            <div className='home_farm-main'>
                <HomeProfile />
                <Board_Post />
                <Tier />
            </div>

            <div className="lower">
                <p>고객센터 : 1234-5678 (평일 09:00 ~ 19:00 토요일 09:00 ~ 15:00) | 단국대학교 멋쟁이 농부처럼(주)</p>
                <h2>LIKE FARMER</h2>
            </div>
        </>
    );
}
export default HomeFarm;