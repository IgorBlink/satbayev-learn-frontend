import React, { useEffect, useState } from 'react';
import "./toplider.css"
import {Avatar, Cell, List, Skeleton} from "@telegram-apps/telegram-ui";
import StarIMG from "../../assets/images/star.png";
import Footer from "../../components/Footer";
import { userAPI } from '../../api/userAPI/service';
import { useNotification } from '../../helpers/Notificathions';
import Back from '../../helpers/Back';
import SplitNumbers from '../../helpers/SplitNumbers';

const TopLider = () => {
    const { showNotification } = useNotification();
    const [rating, setRating] = useState(null)

    useEffect(() => {
        async function getTop() {
            const response = await userAPI.getRating()
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setRating(response.data);
        }
        getTop();
    }, []);

    return (
        <div>
            <Back />
            <div>
                <List>
                    {rating !== null ? <>
                        {rating && rating.map((user, index) => {
                            return (   
                                <Cell
                                    onClick={() => window.open(`https://t.me/${user.username}`)}
                                    before={<div className='top__item'><span className="id-item">{index+1}. </span><Avatar src={user?.photoBase64 ? user.photoBase64 : ""} acronym={user?.name?.charAt(0)} size={48}/></div>}
                                    description={`@${user.username}`}
                                    after={<span className="amount">{SplitNumbers(Number(user.points))} DL</span>}
                                >
                                    {user.name || "User"}
                                </Cell>
                            )
                        })}

                    </> : <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                        <Skeleton visible={true} style={{width:"100%", height:"50px", padding:"0 24px"}}></Skeleton>
                        <Skeleton visible={true} style={{width:"100%", height:"50px", padding:"0 24px"}}></Skeleton>
                        <Skeleton visible={true} style={{width:"100%", height:"50px", padding:"0 24px"}}></Skeleton>
                        <Skeleton visible={true} style={{width:"100%", height:"50px", padding:"0 24px"}}></Skeleton>
                    </div>}
                </List>
            </div>
        </div>
    );
};

export default TopLider;