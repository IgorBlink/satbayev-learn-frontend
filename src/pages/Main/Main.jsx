import React, { useContext, useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import Slider from '../../components/Slider';
import './Main.css';
import { Cell, Avatar, Skeleton, Placeholder, Button } from '@telegram-apps/telegram-ui';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router';
import { coursesAPI } from '../../api/coursesAPI/service';
import { useNotification } from '../../helpers/Notificathions';
import { UserContext } from '../../App';
import StarIMG from './../../assets/images/star.png';
import { userAPI } from '../../api/userAPI/service';
import RecommendedCourses from '../../components/RecommendedCourses/RecommendedCourses';

const Main = () => {
    const nav = useNavigate();
    const { showNotification } = useNotification();
    const { user, courses: userCourses } = useContext(UserContext);

    const [allCategories, setAllCategories] = useState(null);
    const [courses, setCourses] = useState(null);
    const [rating, setRating] = useState(null);
    const [recommendations, setRecommendations] = useState(null);

    useEffect(() => {
        async function getCoursesData() {
            const response = await coursesAPI.getCourses();
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setAllCategories(response.data.coursesCategory);
            setCourses(response.data.courses);
        }

        async function getRatingUser() {
            const response = await userAPI.getRatingMe();
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setRating(response.data);
        }

        async function fetchRecommendations() {
            try {
                const response = await userAPI.getCourseRecommendations(user.user.telegramId);
                if (response.success === false || !response.recommendations) {
                    setRecommendations([]);
                } else {
                    setRecommendations(response.recommendations);
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                setRecommendations([]);
            }
        }

        getRatingUser();
        getCoursesData();
        fetchRecommendations();
    }, [user]);

    const getCoursesByCategory = (categoryId) => {
        return courses.filter(course => course.category === categoryId);
    };

    return (
        <div>
            <div style={{ marginBottom: "80px" }}>
                <div className="container">
                    <Banner />
                    <Skeleton visible={rating === null} onClick={() => nav("/top")}>
                        <Cell
                            before={<Avatar src={StarIMG} size={48} />}
                            description={`You're in ${rating?.place} place.`}
                        >
                            Rating
                        </Cell>
                    </Skeleton>
                </div>

                {recommendations && recommendations.length > 0 ? (
                    <RecommendedCourses />
                ) : (
                    <div className="container">
                        <Placeholder header="Nothing to recommend">
                            <p>Maybe choose some skills?</p>
                            <Button onClick={() => nav('/skillschoose')} size="l">
                                Choose Skills
                            </Button>
                        </Placeholder>
                    </div>
                )}

                {allCategories === null ? <div className={'container'}><Skeleton visible={true} style={{width:"100%", height:"200px", marginTop:"30px", padding: "0 24px"}}></Skeleton></div> : <>
                
                    {true ? (
                    allCategories.map((category) => {
                        const categoryCourses = getCoursesByCategory(category.id);
                        const availableCourses = categoryCourses.filter(course => 
                            !userCourses.some(data => data.id === course.id)
                        );
                        if (availableCourses.length > 0) {
                            return (
                                <div key={category.id}>
                                    <Slider
                                        title={category.title}
                                        courses={availableCourses}
                                        id={category.id}
                                    />
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <div className="HIJtihMA8FHczS02iWF5">
                        <Placeholder header="Course list is empty">
                            <img
                                alt="Telegram sticker"
                                className="blt0jZBzpxuR4oDhJc8s"
                                src="https://xelene.me/telegram.gif"
                            />
                        </Placeholder>
                    </div>
                )}
                </>}
            </div>

            <Footer active={1} />
        </div>
    );
};

export default Main;
