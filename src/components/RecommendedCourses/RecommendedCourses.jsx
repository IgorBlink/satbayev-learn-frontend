import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Skeleton } from '@telegram-apps/telegram-ui';
import { getCourseRecommendations } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useNotification } from '../../helpers/Notificathions';
import { coursesAPI } from '../../api/coursesAPI/service';
import './RecommendedCourses.css';

const RecommendedCourses = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingStart, setLoadingStart] = useState(false);
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { user, courses: userCourses, fetchUser } = useContext(UserContext);

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                // Get courses from backend
                const coursesResponse = await coursesAPI.getCourses();
                if (coursesResponse.success === false) {
                    throw new Error(coursesResponse.data.error);
                }
                const backendCourses = coursesResponse.data.courses;

                // Get recommendations
                const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
                if (telegramId) {
                    const response = await getCourseRecommendations(telegramId);
                    const recommendedTitles = response.recommendations
                        .replace(/```json\n|\n```/g, '')
                        .trim();
                    const titles = JSON.parse(recommendedTitles);
                    
                    // Filter courses: recommended AND not started by user
                    const availableCourses = backendCourses
                        .filter(course => titles.includes(course.title))
                        .filter(course => !userCourses?.some(userCourse => 
                            String(userCourse.id) === String(course.id)
                        ));

                    setRecommendations(availableCourses);
                }
            } catch (error) {
                console.error('Error loading recommendations:', error);
                setError('Failed to load recommendations');
                showNotification('Error', 'Failed to load recommendations', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, [userCourses, showNotification]);

    const handleStartCourse = async (course) => {
        setLoadingStart(true);
        try {
            const response = await coursesAPI.startCourse(course.id);
            if (response.success === false) {
                showNotification('Error', response.data.error, 'error');
                return;
            }
            await fetchUser();
            showNotification('Success', "You have successfully started a course", 'success');
            navigate(`/courses/${course.category}`);
        } catch (error) {
            console.error('Error starting course:', error);
            showNotification('Error', 'Failed to start course', 'error');
        } finally {
            setLoadingStart(false);
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
                                <Button 
                                    size="m" 
                                    className="start-course-btn"
                                    onClick={() => handleStartCourse(course)}
                                    loading={loadingStart}
                                    mode="gray"
                                >
                                    Start Learning
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecommendedCourses;