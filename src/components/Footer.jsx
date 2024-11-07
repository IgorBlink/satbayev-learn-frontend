import React, { useContext } from 'react';
import {
    TabbarItem
} from "@telegram-apps/telegram-ui/dist/components/Layout/Tabbar/components/TabbarItem/TabbarItem";
import {Icon28Devices} from "@telegram-apps/telegram-ui/dist/icons/28/devices";
import { Avatar, Tabbar } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router';
import { Icon20HomeOutline, Icon20StatisticsOutline, Icon24EducationOutline } from '@vkontakte/icons';
import { UserContext } from '../App';


const Footer = ({active}) => {
    const nav = useNavigate()

    const {user} = useContext(UserContext)
    return (
        <Tabbar className={'Tabbar'} style={{paddingBottom: "16px", zIndex:"1000000000"}}>
            <TabbarItem text="Home" style={{color:active == 1 ? "rgba(0, 122, 255, 1)" : ""}} className={'tab__item'+active === 1 ? "tab__item__active" : ""} onClick={() => nav("/")}>
                <Icon20HomeOutline width={28} height={28} color={active == 1 ? "rgba(0, 122, 255, 1)" : ""}/>
            </TabbarItem>

            <TabbarItem text="Courses" style={{color:active == 2 ? "rgba(0, 122, 255, 1)" : ""}} className={'tab__item'+active === 2 ? "tab__item__active" : ""} onClick={() => nav("/courses")}>
                <Icon24EducationOutline width={28} height={28} color={active == 2 ? "rgba(0, 122, 255, 1)" : ""}/>
            </TabbarItem>

            <TabbarItem text="Statistics" style={{color:active == 3 ? "rgba(0, 122, 255, 1)" : ""}} className={'tab__item'+active === 3 ? "tab__item__active" : ""} onClick={() => nav("/statistics")}>
                <Icon20StatisticsOutline width={28} height={28} color={active == 3 ? "rgba(0, 122, 255, 1)" : ""}/>
            </TabbarItem>

            <TabbarItem text="Profile" style={{color: active == 4 ? "rgba(0, 122, 255, 1)" : ""}} className={'tab__item'+active === 4 ? "tab__item__active" : ""} onClick={() => nav("/history")}>
                <Avatar size={28} src={user?.photoBase64 ? user.photoBase64 : ""} acronym={user?.name?.charAt(0)} color={active == 4 ? "rgba(0, 122, 255, 1)" : ""}/>
            </TabbarItem>
        </Tabbar>
    );
};

export default Footer;