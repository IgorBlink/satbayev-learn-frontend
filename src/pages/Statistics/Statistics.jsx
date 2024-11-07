import React, { useEffect, useState } from 'react';
import Footer from "../../components/Footer";
import {Avatar, Cell, Skeleton} from "@telegram-apps/telegram-ui";
import StarIMG from "../../assets/images/star.png";

import "./Satistics.css"
import { userAPI } from '../../api/userAPI/service';
import { useNotification } from '../../helpers/Notificathions';
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const [rating, setRating] = useState(null);

    useEffect(() => {
        async function getRatingUser() {
            const response = await userAPI.getRatingMe();
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setRating(response.data);
        }

        getRatingUser()
    }, []);

    return (
        <div style={{paddingTop:"24px", paddingBottom:"80px"}}>
            <div className="container">
                    <Skeleton visible={rating === null} onClick={() => navigate("/top")}>
                        <Cell
                            before={<Avatar src={StarIMG} size={48} />}
                            description={`You're in ${rating?.place} place.`}
                        >
                            Rating
                        </Cell>
                    </Skeleton>

                <div className="lite-banner">
                    <span className="title">Courses completed</span>
                    <span className={'count'}>1,000</span>
                </div>

                <div className="info-blocks">
                    <div className="block-item">
                        <div className="count">4.5h.</div>
                        <span className={'description'}>Average time to complete the module</span>
                    </div>
                    <div className="block-item">
                        <div className="count">2d.</div>
                        <span
                            className={'description'}>Average time to complete the course</span>
                    </div>
                </div>

                <div className="lite-banner">
                    <span className="title">Courses completed</span>
                    <span className={'count'}>1,000</span>
                </div>

                {/* New Skills Button */}
                <div 
                    className="skills-redirect-banner"
                    onClick={() => navigate('/skillschoose')}
                >
                    <div className="skills-redirect-content">
                        <div className="skills-redirect-text">
                            <span className="skills-redirect-title">Unlock Your Potential ✨</span>
                            <span className="skills-redirect-subtitle">Choose skills & start your journey</span>
                        </div>
                        <span className="skills-redirect-icon">🚀</span>
                    </div>
                </div>
            </div>
            <Footer active={3}/>
        </div>
    );
};

export default Statistics;