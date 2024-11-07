import React, { useContext, useEffect, useState } from 'react';
import "./history.css";
import Footer from "../../components/Footer";
import { Avatar, Button, Cell, Input, List, Modal, Placeholder, Skeleton } from "@telegram-apps/telegram-ui";
import StarIMG from "../../assets/images/star.png";
import Banner from "../../components/Banner";
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { useNotification } from '../../helpers/Notificathions';
import { userAPI } from '../../api/userAPI/service';
import { format } from 'date-fns'; // Импорт функции format из date-fns
import { UserContext } from '../../App';

const History = () => {
    const { showNotification } = useNotification();
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [wallet, setWallet] = useState("");

    const {user} = useContext(UserContext)

    useEffect(() => {
        async function getHistory() {
            const response = await userAPI.getUserHistory();
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setHistory(response.data.history);
        }
        getHistory();
    }, []);

    const handleWithdraw = async () => {
        if (wallet.trim() === "") return showNotification("Error", "Enter the correct value", "error");
        setLoading(true);
        try {
            const response = await userAPI.postWithdraw(wallet);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            return showNotification('Success', "You have successfully created a withdrawal request", 'success');
        } catch (e) {
            console.log(e);
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="container" style={{paddingBottom:"80px"}}>
                <div className="first-block" style={{ marginTop: "24px" }}>
                    <Cell
                        before={<Avatar src={user?.photoBase64 ? user.photoBase64 : ""} acronym={user?.name?.charAt(0)}size={48} />}
                        description={`@${user.username}`}
                    >
                        {user?.name ? user?.name : "User"}
                    </Cell>
                </div>

                <Banner />
                <Modal
                    header={<ModalHeader>Withdraw</ModalHeader>}
                    className='modal__block'
                    trigger={<Button
                        mode="filled"
                        size="l"
                        id={'Withdraw'}
                    >
                        Withdraw
                    </Button>}
                >
                    <List>
                        <Input value={wallet} placeholder='Wallet address' onChange={(e) => setWallet(e.target.value)}/>

                        <Button
                            stretched
                            mode="plain"
                            size="l"
                            id={'Submit'}
                            loading={loading}
                            onClick={handleWithdraw}
                        >
                            Submit
                        </Button>
                    </List>
                    
                </Modal>

                <div className="history-block">
                    <div className="page-title">History</div>

                    {history === null ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", zIndex:"1" }}>
                            <Skeleton visible={true} style={{ width: "100%", height: "50px", padding: "0 24px", borderRadius: "12px" }}></Skeleton>
                            <Skeleton visible={true} style={{ width: "100%", height: "50px", padding: "0 24px", borderRadius: "12px" }}></Skeleton>
                            <Skeleton visible={true} style={{ width: "100%", height: "50px", padding: "0 24px", borderRadius: "12px" }}></Skeleton>
                            <Skeleton visible={true} style={{ width: "100%", height: "50px", padding: "0 24px", borderRadius: "12px" }}></Skeleton>
                        </div>
                    ) : (
                        <>
                            <div className="list-history">
                                {history.length > 0 ? history.map(hist => {
                                    return (
                                        <div className="history-item" key={hist.id}>
                                            <Cell
                                                description={format(new Date(hist.date), 'dd MMMM yyyy')}
                                            >
                                                {hist.title}
                                            </Cell>
                                            <span className={hist.amount < 0 ? "amount-red" : "amount-green"}>
                                                {hist.amount < 0 ? `${hist.amount}` : `+${hist.amount}`} DL
                                            </span>
                                        </div>
                                    );
                                }) : <>
                                    <div className="HIJtihMA8FHczS02iWF5">
                                        <Placeholder
                                            header="Yout history is empty"
                                        >
                                            <img
                                                alt="Telegram sticker"
                                                className="blt0jZBzpxuR4oDhJc8s"
                                                src="https://xelene.me/telegram.gif"
                                            />
                                        </Placeholder>
                                    </div>
                                </>}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer active={4}/>
        </div>
    );
};

export default History;
