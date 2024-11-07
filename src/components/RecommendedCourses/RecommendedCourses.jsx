import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Skeleton, Modal, Cell, Avatar } from '@telegram-apps/telegram-ui';
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { getCourseRecommendations } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useNotification } from '../../helpers/Notificathions';
import { coursesAPI } from '../../api/coursesAPI/service';
import { userAPI } from '../../api/userAPI/service';
import usdtIcon from "../../assets/images/usdt_icon.svg";
import tonIcon from "../../assets/images/ton_icon.svg";
import './RecommendedCourses.css';

const RecommendedCourses = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingStart, setLoadingStart] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { user, courses: userCourses, fetchUser } = useContext(UserContext);
    const [allCourses, setAllCourses] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Get all courses first
                const coursesResponse = await coursesAPI.getCourses();
                if (coursesResponse.success === false) {
                    throw new Error(coursesResponse.data.error);
                }
                setAllCourses(coursesResponse.data.courses);

                // Get recommendations
                const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
                if (telegramId) {
                    const response = await getCourseRecommendations(telegramId);
                    const recommendedTitles = response.recommendations
                        .replace(/```json\n|\n```/g, '')
                        .trim();
                    const titles = JSON.parse(recommendedTitles);
                    
                    // Filter courses based on recommendations and user's courses
                    const recommendedCourses = coursesResponse.data.courses
                        .filter(course => titles.includes(course.title))
                        .filter(course => !userCourses?.some(userCourse => 
                            String(userCourse.id) === String(course.id)
                        ));

                    setRecommendations(recommendedCourses);
                }
            } catch (error) {
                console.error('Error loading data:', error);
                setError('Failed to load recommendations');
                showNotification('Error', 'Failed to load recommendations', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [userCourses, showNotification]);

    const handleStartCourse = async (course) => {
        setLoadingStart(true);
        try {
            const response = await coursesAPI.startCourse(course.id);
            if (response.success === false) {
                showNotification('Error', response.data.error, 'error');
                return;
            }

            // Get updated course data
            const courseDataResponse = await userAPI.getUserCourse(course.id);
            if (courseDataResponse.success === false) {
                showNotification('Error', courseDataResponse.data.error, 'error');
                return;
            }

            await fetchUser();
            showNotification('Success', "You have successfully started a course", 'success');
            navigate(`/course/${course.id}`);
        } catch (error) {
            console.error('Error starting course:', error);
            showNotification('Error', 'Failed to start course', 'error');
        } finally {
            setLoadingStart(false);
        }
    };

    const sendPayment = async(course) => { 
        setLoading(true);
        try {
            const response = await coursesAPI.startCourse(course.id);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            console.log(response);
        } catch (error) {
            console.error('Error processing payment:', error);
            showNotification('Error', 'Payment processing failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="recommended-section container">
                <Skeleton visible={true} className="recommended-skeleton">
                    <div style={{ height: "400px" }}></div>
                </Skeleton>
            </div>
        );
    }

    if (error || !recommendations || recommendations.length === 0) {
        return null;
    }

    return (
        <div className="recommended-section container">
            <h2 className="recommended-title">Recommended for You</h2>
            <p className="recommended-subtitle">Based on your skills</p>
            
            <div className="recommended-courses">
                {recommendations.map((course) => (
                    <Card key={course.id} className="recommended-course-card">
                        <div className="course-image-wrapper">
                            <img 
                                src={course.image} 
                                alt={course.title} 
                                className="course-image"
                                loading="lazy"
                            />
                            <div className="course-overlay">
                                <span className="course-bonus">+{course.bonus} DL</span>
                            </div>
                            <div className="course-price">
                                <span>{course.price === 0 ? 'Free' : `${course.price} ${course.currency}`}</span>
                            </div>
                        </div>
                        
                        <div className="course-content">
                            <div className="course-header">
                                <h3 className="course-title">{course.title}</h3>
                                <span className="course-author">by {course.author}</span>
                            </div>
                            
                            <p className="course-description">{course.description}</p>
                            
                            <div className="course-meta">
                                <span className="course-level">Level: {course.minimumSkill}</span>
                            </div>
                            
                            <div className="course-footer">
                                {course.price === 0 ? (
                                    <Button 
                                        size="m" 
                                        className="start-course-btn"
                                        onClick={() => handleStartCourse(course)}
                                        loading={loadingStart}
                                        mode="gray"
                                        id={'but-course-start'}
                                    >
                                        Start Learning
                                    </Button>
                                ) : (
                                    <Modal 
                                        header={<ModalHeader>Select payment method</ModalHeader>} 
                                        trigger={
                                            <Button 
                                                size="m" 
                                                id={'tg-but-by'} 
                                                loading={loading}
                                            >
                                                Buy for {course.price}$
                                            </Button>
                                        } 
                                        style={{paddingBottom: "16px"}} 
                                    > 
                                        <Cell 
                                            before={<Avatar src={tonIcon} size={48} />} 
                                            description="The Open Network"
                                            onClick={() => sendPayment(course)} 
                                        > 
                                            TON 
                                        </Cell> 
                                        <Cell 
                                            before={<Avatar src={usdtIcon} size={48} />} 
                                            description="The Open Network" 
                                            onClick={() => sendPayment(course)} 
                                        > 
                                            USDT 
                                        </Cell> 
                                    </Modal>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecommendedCourses;