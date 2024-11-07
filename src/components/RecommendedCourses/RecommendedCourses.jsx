import React, { useState, useEffect } from 'react';
import { Cell, Card, Button } from '@telegram-apps/telegram-ui';
import { getCourseRecommendations } from '../../api/api';
import './RecommendedCourses.css';

const RecommendedCourses = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
                if (telegramId) {
                    const response = await getCourseRecommendations(telegramId);
                    setRecommendations(response.recommendations);
                }
            } catch (error) {
                console.error('Error loading recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, []);

    if (loading) {
        return <div className="recommended-skeleton"></div>;
    }

    if (!recommendations?.recommended_courses?.length) {
        return null;
    }

    return (
        <div className="recommended-section">
            <h2 className="recommended-title">Recommended for You</h2>
            <p className="recommended-subtitle">{recommendations.overall_path_explanation}</p>
            
            <div className="recommended-courses">
                {recommendations.recommended_courses.map((course, index) => (
                    <Card key={index} className="recommended-course-card">
                        <div className="course-image">
                            <img src={course.image} alt={course.title} />
                            <div className="difficulty-badge">{course.difficulty_match}</div>
                        </div>
                        <div className="course-content">
                            <h3>{course.title}</h3>
                            <p className="course-explanation">{course.explanation}</p>
                            <div className="skills-gained">
                                <h4>Skills you'll gain:</h4>
                                <div className="skills-tags">
                                    {course.skills_gained.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <Button stretched>Start Learning</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecommendedCourses; 