import React, { useContext, useEffect, useState } from 'react';
import "./course.css"
import Footer from "../../components/Footer";
import {Avatar, Badge, Button, Cell, List, Modal, Placeholder, Skeleton} from "@telegram-apps/telegram-ui";
import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import usdtIcon from "../../assets/images/usdt_icon.svg";
import tonIcon from "../../assets/images/ton_icon.svg";
import { coursesAPI } from '../../api/coursesAPI/service';
import Loader from '../../helpers/Loader';
import { useNotification } from '../../helpers/Notificathions';
import { useNavigate, useParams } from 'react-router';
import { UserContext } from '../../App';
import Back from '../../helpers/Back';
import { userAPI } from '../../api/userAPI/service';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import FinishCourse from '../../components/FinishCourse';
import ActualCourse from '../../components/ActualCourse';

const Course = () => {
    const { showNotification } = useNotification();
    const nav = useNavigate()
    const {id} = useParams()

    const [loading, setLoading] = useState(false)

    const [loadingStart, setLoadingStart] = useState(false)

    const {user, setUser, fetchUser, courses} = useContext(UserContext)

    const [course, setCourse] = useState(null);
    const [respStartSucc, setRespStartSucc] = useState(false)
    const [inUserList, setInUserList] = useState(false)

    const [modules, setModules] = useState(null)

    const [tonConnectUI, setOptions] = useTonConnectUI();
    const wallet = useTonWallet();

    const [inUserData, setInUserData] = useState(false)

    const [canClaimSBT, setCancalimSBT] = useState(null)

    useEffect(() => {
        if (!wallet?.account) return;
        try {
            const handleSubmit = async () => {
                const res = await userAPI.claimSBT(id, wallet.account.address)
                if (res?.success === true) {
                    showNotification("Success", "You will receive your NFT soon", "success")
                    setRespStartSucc(true)
                    nav("/")
                } else if (res?.error) {
                    return showNotification("Error",res.data.error , "error")
                } else {
                    return;
                }
            };
            handleSubmit();
        } catch (e) {
            console.log(e);
            return showNotification("Error", "", "error")
        } finally {
            tonConnectUI.disconnect()
            return tonConnectUI.closeModal();
        }
    }, [wallet]);

    const handleGetModules = async () => {
        try {
            const response = await coursesAPI.getModules(id)
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setModules(response.data.modules)
        } catch (e) {
            console.log(e)
            return 
        }
    }

    async function getCoursesDataMy() {
        try {
            const response = await userAPI.getUserCourse(id);
            if (response.success === false) {
                if(!inUserData) return
                return showNotification('Error', response.data.error, 'error');
            }
            setInUserList(response.data);
        } finally {
        }
        
    }

    async function getClaimData() {
        const response = await userAPI.canClaimSBT(id);
        if (response.success === false) {
            if(!inUserData) return
            return showNotification('Error', response.data.error, 'error');
        }
        setCancalimSBT(response.data);
    }

    /*const [coursesArray, setCourses] = useState(null)

    async function getCourses() {
        const response = await userAPI.getUserCourses();
        if (response.success === false) {
            return showNotification('Error', response.data.error, 'error');
        }
        setCourses(response.data.courses);
    }

    getCourses();
    */

    useEffect(() => {
        if(!id) return 
        async function getCoursesData() {
            const response = await coursesAPI.getCourse(id);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setCourse(response.data.course);
        }
        
        getCoursesData()
        handleGetModules()
        getCoursesDataMy()
        getClaimData()
    }, [id]);


    useEffect(() => {
        if(!user) return
        setInUserData(courses.find(ob => String(ob.id) == String(id)))
    }, [user])

    const handleStartCourse = async () => {
        setLoading(true)
        setLoadingStart(true)
        try {
            const response = await coursesAPI.startCourse(id)
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            await getCoursesDataMy()
            await fetchUser()
            setInUserData(true)
            return showNotification('Success', "You have successfully statred a course", 'success');
        } catch (e) {
            console.log(e)
            return 
        } finally {
            setLoading(false)
            setLoadingStart(false)
        }
    }

    const sendPayment = async() => { 
        setLoading(true)
        try {
            const response = await coursesAPI.startCourse(id)
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            console.log(response)
            //return showNotification('Success', "You have successfully statred a course", 'success');
        } catch (e) {
            console.log(e)
            return 
        } finally {
            setLoading(false)
        }
    }

    if(course === null || loadingStart === true) return <Loader />


    const unfinishedModules = inUserList?.modules?.filter(mod => mod.finished) || [];

    return (
        <div> 
            <Back callback={() => nav("/courses")}/>
            <div className="container"> 
                <div className="preview-course">
                    <img 
                        src={course?.image}
                        alt=""/> 
                    <div className="text-prew-block"> 
                        <h1 className="title">{course?.title}</h1> 
                        <span className="description">{course?.description}</span> 
                    </div> 
                </div> 


                {!inUserData ? <>
                    {course.price === 0 ? <Button 
                        onClick={() => handleStartCourse()}
                        mode="gray"
                        size="m"
                        id={'but-course-start'} 
                        loading={loading}
                    > 
                        Start 
                    </Button>  : <Modal 
                        header={<ModalHeader>Select payment method</ModalHeader>} 
                        trigger={<Button size="m" id={'tg-but-by'} loading={loading}>Buy for {course.price}$</Button>} 
                        style={{paddingBottom: "16px"}} 
                    > 
                        <Cell 
                            before={<Avatar src={tonIcon} size={48} />} 
                            description="The Open Network"
                            onClick={sendPayment} 
                        > 
                            TON 
                        </Cell> 
                        <Cell 
                            before={<Avatar src={usdtIcon} size={48} />} 
                            description="The Open Network" 
                            onClick={sendPayment} 
                        > 
                            USDT 
                        </Cell> 
                    </Modal> }
                </> : inUserList?.course?.status === "finished" ? <FinishCourse canClaimSBT={canClaimSBT} modules={modules} tonConnectUI={tonConnectUI}/>  : <>
                {inUserList?.course?.status === "pending" ?
                <>
                    {modules !== null ? <ActualCourse setLoadingStart={setLoadingStart} unfinishedModules={inUserList?.modules} modules={modules} tonConnectUI={tonConnectUI} loading={loading} setLoading={setLoading} progress={unfinishedModules.length} id={id}/> : <Skeleton visible={true} style={{width:"100%", height:"100px"}}></Skeleton>}
                    {
                        respStartSucc === true && modules == null ? <><Skeleton visible={true} style={{width:"100%", height:"100px",marginTop:"10px"}}></Skeleton></> : <></>
                    }
                </>
                : <></>}
                </>}
                
                
                
 
 
            </div> 
        </div>

    );
};

export default Course;