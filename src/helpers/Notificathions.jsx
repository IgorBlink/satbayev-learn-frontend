import React, { createContext, useContext, useState, useEffect } from 'react';
import { Avatar, Snackbar } from "@telegram-apps/telegram-ui";
import ErrorIMG from "./../assets/images/error.png";
import SuccessIMG from "./../assets/images/success.png";

const NotificationContext = createContext();

//const { showNotification } = useNotification();

export const NotificationProvider = ({ children }) => {
    const [notif, setNotif] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const showNotification = (title = "", description = "", type = "success", beforeImg = "", duration = 3000) => {
        setNotif({
            title,
            description,
            beforeImg: type === "success" ? SuccessIMG: type === "error" ? ErrorIMG : beforeImg,
            duration
        });
        console.log("Notification sent");
    };

    useEffect(() => {
        if (!notif) return;

        const timer = setTimeout(() => {
            setIsClosing(true);
            setTimeout(() => {
                setNotif(null);
                setIsClosing(false);
            }, 1000); 
        }, notif.duration);

        return () => clearTimeout(timer); 
    }, [notif]);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notif && (
                <Snackbar
                    onClick={() => setNotif(null)}
                    className={`snackbar ${isClosing ? 'snackbar__close' : ''}`}
                    duration={notif.duration + 1000}
                    before={notif.beforeImg && <Avatar size={36} src={notif.beforeImg} />}
                    description={notif.description}
                >
                    {notif.title}
                </Snackbar>
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};