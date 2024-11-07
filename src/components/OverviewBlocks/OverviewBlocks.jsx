import { Button, Placeholder, Steps } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import WelcomeTgs from './../../assets/tgs/welcome.tgs';
import WorldwideTgs from './../../assets/tgs/word_wide.tgs';
import ApplePayTgs from './../../assets/tgs/ap_gp.tgs';
import PaymentsTgs from './../../assets/tgs/payments.tgs';
import KycTgs from './../../assets/tgs/kyc.tgs';
import Loader from "../../helpers/Loader";
import { userAPI } from '../../api/userAPI/service';
import { useNotification } from '../../helpers/Notificathions';

const OverviewBlocks = () => {
    const [step, setStep] = useState(1);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const { showNotification } = useNotification();

    const skills = [
        { id: 'html', name: 'HTML', icon: '🌐' },
        { id: 'css', name: 'CSS', icon: '🎨' },
        { id: 'js', name: 'JavaScript', icon: '⚡' },
        { id: 'react', name: 'React', icon: '⚛️' },
        { id: 'backend', name: 'Backend', icon: '⚙️' },
        { id: 'database', name: 'Databases', icon: '🗄️' },
        { id: 'python', name: 'Python', icon: '🐍' },
        { id: 'mobile', name: 'Mobile Dev', icon: '📱' }
    ];

    const toggleSkill = (skillId) => {
        if (selectedSkills.includes(skillId)) {
            setSelectedSkills(selectedSkills.filter(id => id !== skillId));
        } else {
            if (selectedSkills.length < 5) {
                setSelectedSkills([...selectedSkills, skillId]);
            } else {
                showNotification("Warning", "You can select up to 5 skills", "warning");
            }
        }
    };

    const handleSubmitSkills = async () => {
        if (selectedSkills.length === 0) {
            showNotification("Error", "Please select at least one skill", "error");
            return;
        }

        const response = await userAPI.updateUserSkills(selectedSkills);
        if (response.success === false) {
            showNotification("Error", response.data.error, "error");
            return;
        }
        setStep(5);
    };

    const getTgsSrcForStep = (step) => {
        switch (step) {
            case 1:
                return WelcomeTgs;
            case 2:
                return WorldwideTgs;
            case 3:
                return ApplePayTgs;
            case 4:
                return PaymentsTgs;
            case 5:
                return KycTgs;
            default:
                return WelcomeTgs; 
        }
    };

    return (
        <div className="overview__blocks">
            <div className="overview__blocks__steps" onClick={() => setStep(prev => {
                        if (prev === 1) return 1;
                        return prev - 1;
                    })}>
                <Steps
                    count={5}
                    progress={step}
                />
            </div>

            {step === 1 ? (
                <Placeholder 
                    action={<Button onClick={() => setStep(2)}>Let's go!</Button>}
                    description="DecentraLearn is a learning platform right in Telegram! Let's tell you more about it"
                    header={`Welcome!`}
                >
                    <tgs-player key={step} autoplay loop mode="normal" src={getTgsSrcForStep(step)} style={{width: 150, height: 150}}></tgs-player>
                </Placeholder>
            ) : step === 2 ? ( 
                <Placeholder 
                    action={<Button onClick={() => setStep(3)}>Wow! Next?</Button>}
                    description="We provide over 50 courses on a variety of topics"
                    header="Learn anything"
                >
                    <tgs-player key={step} autoplay loop mode="normal" src={getTgsSrcForStep(step)} style={{width: 150, height: 150}}></tgs-player>
                </Placeholder>
            ) : step === 3 ? (
                <Placeholder 
                    action={<Button onClick={() => setStep(4)}>Nice</Button>}
                    description="Get rewarded for every module and course you complete. Withdraw directly to your TON wallet."
                    header="DecentraLearn points"
                >
                    <tgs-player key={step} autoplay loop mode="normal" src={getTgsSrcForStep(step)} style={{width: 150, height: 150}}></tgs-player>
                </Placeholder>
            ) : step === 4 ? (
                <div className="skills-selection">
                    <h2>Choose Your Skills</h2>
                    <p className="skills-description">Select up to 5 technologies you want to master</p>
                    <div className="skills-grid">
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                className={`skill-bubble ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
                                onClick={() => toggleSkill(skill.id)}
                            >
                                <span className="skill-icon">{skill.icon}</span>
                                <span className="skill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="skills-footer">
                        <span className="skills-counter">{selectedSkills.length}/5 selected</span>
                        <Button onClick={handleSubmitSkills} disabled={selectedSkills.length === 0}>
                            Continue
                        </Button>
                    </div>
                </div>
            ) : step === 5 ? (
                <Placeholder 
                    action={<Button onClick={() => window.location.reload()}>Okay. Take me to the app</Button>}
                    description="Get on the leaderboard which is built from the number of points"
                    header="Leaderboard"
                >
                    <tgs-player key={step} autoplay loop mode="normal" src={getTgsSrcForStep(step)} style={{width: 150, height: 150}}></tgs-player>
                </Placeholder>
            ) : <Loader />}
        </div>
    );
};

export default OverviewBlocks;
