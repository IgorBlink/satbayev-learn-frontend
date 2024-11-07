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
                    // Extract course titles from Gemini's response
                    const recommendedTitles = response.recommendations
                        .replace(/```json\n|\n```/g, '') // Remove JSON code block markers
                        .trim();
                    const titles = JSON.parse(recommendedTitles);
                    
                    // Find full course details from COURSES data
                    const COURSES = [
                        {
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

                    const fullCourseDetails = titles.map(title => 
                        COURSES.find(course => course.title === title)
                    ).filter(Boolean);

                    setRecommendations(fullCourseDetails);
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
                            <div className="course-price">
                                <span>Free</span>
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