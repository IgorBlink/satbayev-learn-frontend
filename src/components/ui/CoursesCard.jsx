import { Icon12Download } from '@vkontakte/icons';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../App';

const CoursesCard = ({ title, percent = null, img, price = null, status, id }) => {
    const { courses } = useContext(UserContext);
    const nav = useNavigate();

    //if (courses.find(ob => String(ob.id) === String(id))) return null;

    return (
        <div className="item-mycourses" onClick={() => nav(`/course/${id}`)}>
            <img
                src={img ? img : "https://s3-alpha-sig.figma.com/img/99e5/a687/4991d4d3b2c786b13f5a4d2087819ed2?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P-11~5qP91Vc9DrBaExvepdfAjcbk4oiLbCqqfeun6nPiLCrQ5jolgA-2qcro7VZymK0V-mhTxt~NLtdbeLaQe2S0GpcebeyYBFCKmavDwDV0pYk-wkKfN-~5sJZya0SInDGncNbd1UhZl2rB0fgQeG76FBp7b-bPg3btLrUvKLy5XTHgutYBVBXu5L6~3obY9b9HZoIenHhLggwWVppzebBdSaw5cDcwPTNDubHs7gz0w9UiWEJ5oM5LXECh3jL1Y~19LdqaRogIrY6u7zizcZPO5UN36ip9YPgL0VGElRv1G~TrgijN3MD3f8L4sjPCZ9h0gwJRy7jjKdbCBE4GQ__"}
                alt=""
            />
            <div className="info-mycoursrs">
                <span className="title">{title}</span>
                <span className={
                    status === "finished" 
                        ? "procent-green" 
                        : Number(percent) <= 10 
                            ? "procent-red" 
                            : Number(percent) <= 30 
                                ? "procent-blue" 
                                : "procent-green"
                }>
                    {price !== null 
                        ? price === 0 
                            ? <span className="slider-card-price">Free</span> 
                            : <div className="price__course">{price}$</div>
                        : status === "finished" 
                            ? <div style={{ fontSize: "12px", display: "flex", gap: "5px", color: "procent-green" }}>
                                <Icon12Download /> Claim SBT 
                              </div> 
                            : <>{percent === null ? 0 : percent?.toFixed(0)}%</>
                    }
                </span>
            </div>
        </div>
    );
};

export default CoursesCard;
