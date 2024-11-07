import { Button, Input, List } from "@telegram-apps/telegram-ui"
import { useEffect, useState } from "react"
import { userAPI } from "../../api/userAPI/service"
import { useNavigate, useParams } from "react-router"
import { useNotification } from "../../helpers/Notificathions"
import Loader from "../../helpers/Loader"


const Hometask = () => {
    const {id, moduleId} = useParams()
    const { showNotification } = useNotification();
    const [homework, setHomework] = useState(null)
    const nav = useNavigate()
    const [honework, setHomeworkTask] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!id) return 
        async function getCoursesData() {
            const response = await userAPI.getHomework(id, moduleId);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setHomework(response.data);
        }
        
        
        getCoursesData();
    }, [id])

    const handleSubmit = async () => {
        if(!honework) return showNotification('Error', "Enter a correct value", 'error');
        setLoading(true)
        try {
            const response = await userAPI.postHomework(id, moduleId, honework);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            nav(`/course/${id}`);
            return showNotification('Success', "You have completed module", 'success');
        } finally {
            setLoading(false)
        }
    };

    if(homework === null) return <Loader />
    return (
        <List>
            <div className="home-task" style={{marginTop: "24px"}}> 
                <span className="page-title" style={{fontSize: "24px"}}>Hometask</span> 

                <div className="tasks-block"> 
                    <p className="desc-task">{homework?.homework?.content}</p> 

                    <div className="testing-block"> 
                        <Input onChange={(e) => setHomeworkTask(e.target.value)} value={honework} placeholder="Enter value"/>
                    </div> 
                </div> 

                <Button
                    mode="bezeled" 
                    style={{marginTop:"24px"}}
                    size="m" 
                    id={'Claim SBT'}
                    loading={loading}
                    stretched
                    onClick={() => handleSubmit()}
                > 
                    Submit 
                </Button> 
            </div>
        </List>
    )
}

export default Hometask