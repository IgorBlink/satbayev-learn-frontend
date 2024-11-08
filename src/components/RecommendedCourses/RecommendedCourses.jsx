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
                const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
                if (telegramId) {
                    const response = await getCourseRecommendations(telegramId);
                    const recommendedTitles = response.recommendations
                        .replace(/```json\n|\n```/g, '')
                        .trim();
                    const titles = JSON.parse(recommendedTitles);
                    
                    const COURSES = [
                        {
                            "id": "6713c3cdfc574a75ca2e3134",
                            "title": "Web Development: from Zero to Hero with test",
                            "description": "Learn web development from scratch",
                            "image": "https://img-c.udemycdn.com/course/480x270/437398_46c3_10.jpg",
                            "author": "Igor Blink",
                            "price": 0,
                            "currency": "DL",
                            "minimumSkill": "beginner",
                            "category": "6713c388c76c21301aec4209",
                            "bonus": 500
                        },
                        {
                            "id": "672c753f0c8b0afe26998847",
                            "title": "React: the complete guide with test",
                            "description": "Learn React from scratch",
                            "image": "https://img-b.udemycdn.com/course/240x135/1565838_e54e_18.jpg",   
                            "author": "Igor Blink",
                            "price": 0,Please check 'My Courses' page to continue learning
                            "currency": "DL",
                            "minimumSkill": "beginner",
                            "category": "672c753f0c8b0afe26998847",
                            "bonus": 800
                        },
                        {
                            "id": "6713c3c0fc574a75ca2e3136",
                            "title": "Getting started with SwiftUI with test",
                            "description": "Learn SwiftUI from scratch",
                            "image": "https://img-c.udemycdn.com/course/240x135/1778502_f4b9_12.jpg",
                            "author": "Igor Blink",
                            "price": 0,
                            "currency": "DL",
                            "minimumSkill": "beginner",
                            "category": "6713c388c76c21301aec420a",
                            "bonus": 1500
                        }
                    ];

                    // Filter out courses user has already started
                    const availableCourses = COURSES
                        .filter(course => titles.includes(course.title))
                        .filter(course => !userCourses?.some(userCourse => 
                            String(userCourse.id) === String(course.id)
                        ));

                    setRecommendations(availableCourses);
                }
            } catch (error) {
                console.error('Error loading recommendations:', error);
                setError('Failed to load recommendations');
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, [userCourses]);

    const handleStartCourse = async (course) => {
        setLoadingStart(true);
        try {
            const response = await coursesAPI.startCourse(course.id);
            if (response.success === false) {
                showNotification('Error', response.data.error, 'error');
                return;
            }
            await fetchUser();
            showNotification('Success', "Course started successfully! ", 'success');
            navigate('/courses');
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
                                <span className="course-bonus">+{course.bonus} Points</span>
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