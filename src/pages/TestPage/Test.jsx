import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { userAPI } from "../../api/userAPI/service"
import { useNotification } from "../../helpers/Notificathions"
import { Button, Cell, List, Placeholder, Radio } from "@telegram-apps/telegram-ui"
import Loader from "../../helpers/Loader"
import { Link } from "react-router-dom"


const TestPage = () => {
    const { id, moduleId } = useParams();
    const nav = useNavigate()
    const { showNotification } = useNotification();
    const [testData, setTestData] = useState(null);

    const [loading, setLoading] = useState(false)
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        if (!id) return;
        async function getCoursesData() {
            const response = await userAPI.getTestData(id, moduleId);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            setTestData(response.data.test);
        }

        getCoursesData();
    }, [id]);

    const handleAnswerChange = (questionId, answerId) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answerId
        }));
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const formattedAnswers = Object.keys(answers).map(questionId => ({
                question: questionId,
                answer: answers[questionId]
            }));
    
            const response = await userAPI.sendTestData(id, moduleId, formattedAnswers);
            if (response.success === false) {
                return showNotification('Error', response.data.error, 'error');
            }
            
            if(!response.data.passed) {
                setAnswers({})
                return showNotification('Error', "You have to take the test again", 'error');
            }
    
            if(!response.data.isModuleFinished) {
                return nav(`/courses/${id}/modules/${moduleId}/homework`);
            }
    
            nav(`/course/${id}`);
            return showNotification('Success', "You have completed module", 'success');
        } finally {
            setLoading(false)
        }
    };

    if (testData === null) return <Loader />;

    return (
        <List>
            {testData.length > 0 ? testData.map((question, index) => (
                <div key={question.id} className="question-block">
                    <p className="question page-title">{`Question ${index + 1}: ${question.question}`}</p>

                    <div className={'answer-list'}>
                        {question.answers.map((answer) => (
                            <Cell
                                key={answer.id}
                                Component="label"
                                before={
                                    <Radio 
                                        name={`radio-${question.id}`}
                                        value={answer.id}
                                        checked={answers[question.id] === answer.id}
                                        onChange={() => handleAnswerChange(question.id, answer.id)}
                                    />
                                }
                                multiline
                                className={'answer-item'}
                            >
                                {answer.answer}
                            </Cell>
                        ))}
                    </div>
                </div>
            )) : <>
                <div className="HIJtihMA8FHczS02iWF5">
                    <Placeholder
                        header="Test do not have any questions"
                    >
                    <img
                        alt="Telegram sticker"
                        className="blt0jZBzpxuR4oDhJc8s"
                        src="https://xelene.me/telegram.gif"
                    />
                    </Placeholder>
                </div>
            </>}

            {testData && <Button
                mode="gray"
                size="m"
                id={'question-submit'}
                onClick={handleSubmit}
                loading={loading}
            >
                Submit Answers
            </Button>}
        </List>
    );
}

export default TestPage;
