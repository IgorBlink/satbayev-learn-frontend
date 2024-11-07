import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Skeleton } from '@telegram-apps/telegram-ui';
import { getCourseRecommendations } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useNotification } from '../../helpers/Notificathions';
import './RecommendedCourses.css';

const RecommendedCourses = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { user, courses: userCourses } = useContext(UserContext);

    const COURSES = [
        {
            "id": "course1",
            "title": "Web Development: from Zero to Hero with test",
            "description": "Learn web development from scratch",
            "image": "https://img-c.udemycdn.com/course/480x270/437398_46c3_10.jpg",
            "author": "Igor Blink",
            "price": 0,
            "currency": "DL",
            "minimumSkill": "beginner",
            "category": "672c753f0c8b0afe26998847",
            "bonus": 500
        },
        {
            "id": "course2",
            "title": "React: the complete guide with test",
            "description": "Learn React from scratch",
            "image": "https://img-b.udemycdn.com/course/240x135/1565838_e54e_18.jpg",
            "author": "Igor Blink",
            "price": 0,
            "currency": "DL",
            "minimumSkill": "beginner",
            "category": "672c753f0c8b0afe26998847",
            "bonus": 800
        },
        {
            "id": "course3",
            "title": "Getting started with SwiftUI with test",
            "description": "Learn SwiftUI from scratch",
            "image": "https://img-c.udemycdn.com/course/240x135/1778502_f4b9_12.jpg",
            "author": "Igor Blink",
            "price": 0,
            "currency": "DL",
            "minimumSkill": "beginner",
            "category": "672c753f0c8b0afe26998848",
            "bonus": 1500
        }
    ];

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

                    let recommendedCourses = COURSES.filter(course => titles.includes(course.title));

                    if (userCourses && userCourses.length > 0) {
                        recommendedCourses = recommendedCourses.filter(course =>
                            !userCourses.some(userCourse => userCourse.id === course.id)
                        );
                    }

                    setRecommendations(recommendedCourses);
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

    const handleStartCourse = (course) => {
        try {
            navigate(`/course/${course.id}`);
        } catch (error) {
            console.error('Error starting course:', error);
            showNotification('Error', 'Failed to start course', 'error');
        }
    };

    if (loading) {
        return (
            <div className="recommended-section">
                <div className="container">
                    <Skeleton visible={true} className="recommended-skeleton">
                        <div style={{ height: "400px" }}></div>
                    </Skeleton>
                </div>
            </div>
        );
    }

    if (error || !recommendations || recommendations.length === 0) {
        return null;
    }

    return (
        <div className="recommended-section">
            <div className="container">
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
                                    >
                                        Start Learning
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendedCourses;