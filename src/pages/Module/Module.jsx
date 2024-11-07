import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { coursesAPI } from "../../api/coursesAPI/service"
import Loader from "../../helpers/Loader"
import { Button, List } from "@telegram-apps/telegram-ui"
import { useNotification } from "../../helpers/Notificathions"
import Back from "../../helpers/Back"
import EditorJS from '@editorjs/editorjs';
import List2 from "@editorjs/list" 
import Header from '@editorjs/header';


const Module = () => {
    const nav = useNavigate()
    const {id, moduleId} = useParams()
    const [module, setModule] = useState(null)
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false)
    const [modules, setModules] = useState(null)

    //const [editor, setEditor] = useState(null)

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

    useEffect(() => {
        if(!id) return;
    
        async function getCoursesData() {
            const response = await coursesAPI.getModule(id, moduleId);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setModule(response.data.module);
        }
    
        getCoursesData();
        handleGetModules();
    
    
    
    }, [id, moduleId]);
    

    console.log(module)
    const handleNextModule = async () => {
        setLoading(true);
        try {
            const response = await coursesAPI.nextModule(id, moduleId);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }

            console.log(module.haveTest)
            if (module.haveTest) {
                return nav(`/courses/${id}/modules/${moduleId}/test`);
            } if (module.haveHomework) {
                return nav(`/courses/${id}/modules/${moduleId}/homework`);
            } else {
                nav(`/course/${id}`);
                return showNotification('Success', "You have completed module", 'success');
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(!module) return
        const editor = new EditorJS({
            holder: 'editorjs',
            data: JSON.parse(module.content),
            readOnly:true,
            minHeight:"100",
            tools: {
                header: Header,
                list: {
                    class: List2,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    }
                  },
              
              },
        });

        return () => {
            editor.destroy()
        }
    }, [module])
    

    if(!module) return <Loader />


    
    return (
        <List>
            <Back />
            <div className="something-about-crypto" style={{ marginTop: "24px"}}> 
                <span className="page-title" style={{fontSize: "24px"}}>{module?.title}</span> 

                <div className="tasks-block"> 
                    <div id="editorjs"></div> 
                </div> 

                {module.video && <div className="preview-course">
                    <video 
                        className="video__block"
                        src={module.video}
                        controls
                    /> 
                </div>}
                
                <Button
                    stretched
                    mode="bezeled" 
                    size="m" 
                    id={'download-certificate'} 
                    loading={loading}
                    onClick={() => handleNextModule()}
                > 
                    Next 
                </Button> 
            </div>
        </List>
    )
}

export default Module