import { Button, Cell, List, Skeleton } from "@telegram-apps/telegram-ui"



const FinishCourse = ({modules, tonConnectUI, canClaimSBT}) => {
    return (
        <>
         <>
         {canClaimSBT.claimed ? <Button
            mode="bezeled" 
            size="m" 
            id={'download-certificate'} 
        > 
            Already claimed
        </Button> :  <Button
            mode="bezeled" 
            size="m" 
            onClick={() => tonConnectUI.openModal()}
            id={'download-certificate'} 
        > 
            Claim SBT 
        </Button>}
                    
                    {modules !== null ? <>
                    <div className="modules-block"> 
                        <div className="page-title" style={{marginBottom: "14px"}}>Modules 
                        </div> 
    

                        {modules && <><List style={{padding:"0px"}}>{modules.map((module, index) => {
                            return (
                                <Cell
                                    before={index+1+". "} 
                                    description={module?.description} 
                                > 
                                    {module?.title}
                                </Cell> 
                            )
                        })}</List></>}
                    </div></> : <Skeleton visible={true} style={{width:"100%", height:"100px"}}></Skeleton>}
                </>
        </>
    )
}

export default FinishCourse