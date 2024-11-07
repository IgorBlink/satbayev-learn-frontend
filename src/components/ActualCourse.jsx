import { Badge, Button, Cell, List, Skeleton } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router";
import { useNotification } from "../helpers/Notificathions";
import { coursesAPI } from "../api/coursesAPI/service";

const ActualCourse = ({ modules, progress, loading, setLoading, id, unfinishedModules, setLoadingStart }) => {
    const nav = useNavigate();
    const { showNotification } = useNotification();

    const handleModuleClick = async (module, index) => {
        if (loading) return;
        setLoadingStart(true)
        const isCurrentModule = progress === index;
        const isFinished = unfinishedModules.some(d => d.id === module.id && d.finished === true);

        if (isCurrentModule && !isFinished) {
            try {
                setLoading(true);
                const response = await coursesAPI.startModule(id, module.id);
                if (response.success === false) {
                    showNotification('Error', response.data.error, 'error');
                    return;
                }
                nav(`/courses/${id}/modules/${module.id}`);
            } finally {
                setLoading(false);
                setLoadingStart(false)
            }
        } else {
            nav(`/courses/${id}/modules/${module.id}`);
        }
    };

    return (
        <>
            <Cell
                before={""}
                description={`${progress} module of ${modules?.length} modules`}
                id={'your-progress'}
            >
                Your progress
            </Cell>
            <div className="modules-block">
                <div className="page-title" style={{ marginBottom: "14px" }}>
                    Modules
                </div>

                {modules && (
                    <List style={{ padding: "0px" }}>
                        {modules.map((module, index) => {
                            const isUnfinished = index === progress
                            return (
                                <Cell
                                    key={module.id}
                                    onClick={() => index === progress && handleModuleClick(module, index)}
                                    disabled={index > progress}
                                    titleBadge={isUnfinished && <Badge type="dot" />}
                                    before={`${index + 1}. `}
                                    description={module.description}
                                >
                                    {module.title}
                                </Cell>
                            );
                        })}
                    </List>
                )}
            </div>
        </>
    );
};

export default ActualCourse;
