import React, { useEffect, useState } from 'react';
import "./CoursesByCategory.css"
import "../MyCourses/mycourses.css"
import CoursesCard from "../../components/ui/CoursesCard";
import Footer from "../../components/Footer";
import { useParams } from 'react-router';
import { coursesAPI } from '../../api/coursesAPI/service';
import { Skeleton } from '@telegram-apps/telegram-ui';
import { useNotification } from '../../helpers/Notificathions';
import Back from '../../helpers/Back';

const CoursesByCategory = () => {
    const { showNotification } = useNotification();
    const {id} = useParams()

    const [course, setCourses] = useState(null);

    useEffect(() => {
        if(!id) return 
        async function getCoursesData() {
            const response = await coursesAPI.getCoursesByCategory(id);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setCourses(response.data);
        }

        getCoursesData();
    }, [id]);

    return (
        <div style={{padding:"24px 0 "}}>
            <Back />
            {course === null ?  <Skeleton visible={true} style={{width:"100%", height:"200px"}}></Skeleton> :
                <div className="container">
                    <div className="page-title">{course.categoryName}</div>
                    {course.courses && <div className="list-mycourses">{course.courses.map(category => {
                        console.log(course)
                        return (
                            <CoursesCard id={category?.id}  status={category.status} title={category.title} price={category.price} percent={category.progress} img={category.image}/>
                        )
                    })}</div>}
                </div>
            }
        </div>
    );
};

export default CoursesByCategory;