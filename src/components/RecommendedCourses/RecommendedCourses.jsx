import React, { useState, useEffect } from 'react';
import { Card, Button, Skeleton } from '@telegram-apps/telegram-ui';
import { getCourseRecommendations } from '../../api/api';
import './RecommendedCourses.css';

const RecommendedCourses = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
                if (telegramId) {
                    const response = await getCourseRecommendations(telegramId);
                    // Parse the JSON string from response.recommendations.text
                    const recommendedCourses = JSON.parse(response.recommendations);
                    setRecommendations(recommendedCourses);
                }
            } catch (error) {
                console.error('Error loading recommendations:', error);
                setError('Failed to load recommendations');
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, []);

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
                {recommendations.map((course, index) => (
                    <Card key={index} className="recommended-course-card">
                        <div className="course-image-wrapper">
                            <img 
                                src={course.image} 
                                alt={course.title} 
                                className="course-image"
                            />
                            <div className="course-overlay">
                                <span className="course-bonus">+{course.bonus} DL</span>
                            </div>
                        </div>
                        
                        <div className="course-content">
                            <div className="course-header">
                                <h3 className="course-title">{course.title}</h3>
                                <span className="course-author">{course.author}</span>
                            </div>
                            
                            <p className="course-explanation">{course.explanation}</p>
                            
                            <div className="course-footer">
                                <Button 
                                    size="m" 
                                    className="start-course-btn"
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