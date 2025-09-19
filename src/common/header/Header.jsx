import React, { useRef, useState } from 'react';
import './style.scss';

import Nav from './nav/Nav';
import { Link, useNavigate } from 'react-router-dom';
import headerData from '../../assets/api/headerData';
import HeaderForm from './headerForm/HeaderForm';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import useUserStore from '../../store/userSlice';
import Login from '../../page/login';
import Join from '../../page/join';
import GoodsList from './nav/navList/GoodsList';

const Header = () => {
    const { isLoggedIn, userInfo, logout } = useUserStore();
    const [show, setShow] = useState(false);
    const [data, setData] = useState(headerData);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isJoinOpen, setIsJoinOpen] = useState(false);
    const toggleLogin = () => setIsLoginOpen((prev) => !prev);
    const toggleJoin = () => setIsJoinOpen((prev) => !prev);
    const swiperRef = useRef();
    const nav = useNavigate();
    const onHome = () => {
        nav('/'); // 홈으로 이동
    };
    return (
        <header id="header" className={show ? 'active' : ''} onMouseLeave={() => setShow(false)}>
            <div className="header_top_menu">
                <ul>
                    {!isLoggedIn ? (
                        <>
                            <li onClick={toggleLogin}>로그인</li>
                            <li onClick={toggleJoin}>회원가입</li>
                        </>
                    ) : (
                        <>
                            <li>{userInfo?.name}님</li>
                            <li onClick={logout}>로그아웃</li>
                            <li onClick={() => nav('/cart')}>장바구니</li>
                            <li>내 예약</li>
                        </>
                    )}
                </ul>
            </div>

            <div className="inner">
                <h1 className="logo" onClick={onHome}>
                    <Link to="/">{/* <img src="" alt="" /> */}</Link>
                </h1>
                <HeaderForm />
                <Nav data={data} setShow={setShow} />
            </div>
            {data[2].isOn && (
                <div className="header_content">
                    <h2>
                        <strong>sounds goods</strong>
                        <p>pop-up store</p>
                    </h2>
                    <button className="swiper_next" onClick={() => swiperRef.current.slideNext()}>
                        <img src="/images/icons/icon-park-outline_right.png" alt="" />
                    </button>
                    <button className="swiper_prev" onClick={() => swiperRef.current.slidePrev()}>
                        <img src="/images/icons/icon-park-outline_left.png" alt="" />
                    </button>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className="mySwiper"
                        slidesPerView={3}
                        spaceBetween={50}
                        slidesPerGroup={3}
                    >
                        {data[2].onContent.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="swiper_content">
                                    <img src={item.img} alt="" />
                                    <p>{item.title}</p>
                                    <span>{item.desc}</span>
                                    <div className="bg"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
            {/* ////////////////////////////////////////////////// */}
            {data[1].isOn && (
                <div className="header_content2">
                    <div className="headergoods">
                        <GoodsList data={data[1]} />
                    </div>
                </div>
            )}

            {isLoginOpen && <Login onClose={toggleLogin} onJoin={toggleJoin} />}
            {isJoinOpen && <Join onClose={toggleJoin} />}
        </header>
    );
};

export default Header;
