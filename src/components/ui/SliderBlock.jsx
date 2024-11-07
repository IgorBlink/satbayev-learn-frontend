import React, { useContext } from 'react';

import { Card } from "@telegram-apps/telegram-ui";
import {
    CardCell
} from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import VibrateModule from '../../helpers/VibrateModule';
import { useNavigate } from 'react-router';
import { UserContext } from '../../App';


const SliderBlock = ({course}) => {
    const {courses} = useContext(UserContext)

    const nav = useNavigate()
    if(courses.find(ob => String(ob.id) == String(course.id))) return
    return (
        <VibrateModule>
            <Card className='card__course' onClick={() => nav(`/course/${course.id}`)}>
                <React.Fragment key=".0">
                    <img
                        alt="Dog"
                        src={course?.image ? course?.image : "https://s3-alpha-sig.figma.com/img/99e5/a687/4991d4d3b2c786b13f5a4d2087819ed2?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P-11~5qP91Vc9DrBaExvepdfAjcbk4oiLbCqqfeun6nPiLCrQ5jolgA-2qcro7VZymK0V-mhTxt~NLtdbeLaQe2S0GpcebeyYBFCKmavDwDV0pYk-wkKfN-~5sJZya0SInDGncNbd1UhZl2rB0fgQeG76FBp7b-bPg3btLrUvKLy5XTHgutYBVBXu5L6~3obY9b9HZoIenHhLggwWVppzebBdSaw5cDcwPTNDubHs7gz0w9UiWEJ5oM5LXECh3jL1Y~19LdqaRogIrY6u7zizcZPO5UN36ip9YPgL0VGElRv1G~TrgijN3MD3f8L4sjPCZ9h0gwJRy7jjKdbCBE4GQ__"}
                        style={{
                            display: 'block',
                            height: 112,
                            objectFit: 'cover',
                            width: "100%"
                        }}
                    />
                    <CardCell
                        readOnly
                        subtitle={ <div style={{display:"flex", flexDirection:'column', minHeight:"70px", justifyContent:"space-between"}}>
                            <div className='description__slide'>{course?.description}</div>
                            {course?.price > 0 ? <span className={'slider-card-price-amount'}>{course?.price}$</span> : <span className={'slider-card-price'}>Free</span>}
                        </div>}
                        style={{fontSize: "10px"}}
                        > 
                            {course?.title}
                    </CardCell>
                    
                </React.Fragment>
            </Card>
        </VibrateModule>
    );
};

export default SliderBlock;