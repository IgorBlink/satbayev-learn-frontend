import React from 'react';
import SliderBlock from './ui/SliderBlock';
import { useNavigate } from 'react-router';
import VibrateModule from '../helpers/VibrateModule';

const Slider = ({title, courses, id}) => {
    const nav = useNavigate()

    if(!courses) return 
    return (
        <>
            <div className="container">
                <div className="slider-category-title">
                    <span>{title}</span>
                    <VibrateModule><div onClick={() => nav(`/courses/${id}`)} className='open__all'>Open all</div></VibrateModule>
                </div>
            </div>
            
            {courses && courses.length > 0 ? <div className='slider-list-item'>{courses.map(course => {
                return (
                    <SliderBlock course={course}/>
                )
            })}</div> : <>

            </>}
            
        </>
    );
};

export default Slider;