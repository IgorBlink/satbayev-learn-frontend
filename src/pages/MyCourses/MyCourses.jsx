import React, { useContext, useEffect, useState } from 'react';

import "./mycourses.css"
import Footer from "../../components/Footer";
import CoursesCard from "../../components/ui/CoursesCard";
import { useNotification } from '../../helpers/Notificathions';
import { UserContext } from '../../App';
import { coursesAPI } from '../../api/coursesAPI/service';
import { userAPI } from '../../api/userAPI/service';
import { useNavigate } from 'react-router';
import { Placeholder, Skeleton } from '@telegram-apps/telegram-ui';

const MyCourses = () => {
    const nav = useNavigate();
    const { showNotification } = useNotification();
    const { user } = useContext(UserContext);

    const [courses, setCourses] = useState(null);

    useEffect(() => {
        async function getCoursesData() {
            const response = await userAPI.getUserCourses();
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setCourses(response.data.courses);
        }

        getCoursesData();
    }, []);


    console.log(courses)

    return (
        <div>
            <div className="container" style={{paddingBottom:"80px", paddingTop:"24px"}}>
                {courses !== null ? <div className="list-mycourses">
                    {courses.length > 0 ? courses.map(course => {
                        return (
                            <CoursesCard id={course?.courseId} title={course.title} percent={course.progress} img={course.image} status={course.status} />
                        )
                    }) : <div className="HIJtihMA8FHczS02iWF5">
                    <Placeholder
                      header="You do not have any courses :("
                    >
                      <img
                        alt="Telegram sticker"
                        className="blt0jZBzpxuR4oDhJc8s"
                        src="https://xelene.me/telegram.gif"
                      />
                    </Placeholder>
                  </div>}
                </div> : <Skeleton visible={true} style={{width:"100%", height:"200px", borderRadius: "12px"}}></Skeleton>}
            </div>
            <Footer active={2}/>
        </div>
    );
};

export default MyCourses;