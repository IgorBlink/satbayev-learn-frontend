import { useState, useEffect } from 'react';
import { Button } from "@telegram-apps/telegram-ui";
import { useNavigate } from 'react-router-dom';
import './SkillsChoose.css';
import { getUserSkills, updateUserSkills } from '../../api/api';
import Loader from '../../helpers/Loader';
import { useNotification } from './helpers/Notificathions'; 
const SkillsChoose = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasExistingSkills, setHasExistingSkills] = useState(false);
    const navigate = useNavigate();
    const { showNotification } = useNotification(); 
    const skills = [
        { id: 'html', name: 'HTML', icon: '🌐' },
        { id: 'css', name: 'CSS', icon: '🎨' },
        { id: 'js', name: 'JavaScript', icon: '⚡' },
        { id: 'react', name: 'React', icon: '⚛️' },
        { id: 'backend', name: 'Backend', icon: '⚙️' },
        { id: 'database', name: 'Databases', icon: '🗄️' },
        { id: 'python', name: 'Python', icon: '🐍' },
        { id: 'mobile', name: 'Mobile Dev', icon: '📱' },
        { id: 'ui_ux', name: 'UI/UX Design', icon: '✨' },
        { id: 'devops', name: 'DevOps', icon: '🔄' },
        { id: 'testing', name: 'Testing', icon: '🧪' },
        { id: 'security', name: 'Security', icon: '🔒' }
    ];

    useEffect(() => {
        const loadUserSkills = async () => {
            try {
                const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
                if (telegramId) {
                    const response = await getUserSkills(telegramId);
                    if (response.skills && response.skills.length > 0) {
                        setSelectedSkills(response.skills);
                        setHasExistingSkills(true);
                    }
                }
            } catch (error) {
                console.error('Error loading skills:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadUserSkills();
    }, []);

    const toggleSkill = (skillId) => {
        if (selectedSkills.includes(skillId)) {
            setSelectedSkills(selectedSkills.filter(id => id !== skillId));
        } else {
            if (selectedSkills.length < 5) {
                setSelectedSkills([...selectedSkills, skillId]);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
            
            if (!telegramId) {
                throw new Error('Telegram ID not found');
            }

            await updateUserSkills(telegramId, selectedSkills);
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Error saving skills:', error);
            // Add error notification
            showNotification?.("Error", "Failed to save skills", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="skills-container123">
            <button className="back-button" onClick={() => navigate('/', { replace: true })}>
                ← Back
            </button>
            <div className="skills-banner123">
                <h1 className="skills-title123">
                    {hasExistingSkills ? 'Change Your Skills' : 'Choose Your Path'}
                </h1>
                <p className="skills-subtitle123">
                    {hasExistingSkills 
                        ? 'Update your learning preferences'
                        : 'Select up to 5 technologies you want to master'
                    }
                </p>
            </div>

            <div className="skills-grid123">
                {skills.map((skill, index) => (
                    <div
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`skill-bubble123 ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <span className="skill-icon123">{skill.icon}</span>
                        <span className="skill-name123">{skill.name}</span>
                        {selectedSkills.includes(skill.id) && (
                            <div className="skill-check123">✓</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="skills-footer123">
                <span className="skills-counter123">
                    {selectedSkills.length}/5 selected
                </span>
                <Button 
                    disabled={selectedSkills.length === 0 || loading}
                    onClick={handleSubmit}
                >
                    {loading ? 'Saving...' : (hasExistingSkills ? 'Update Skills' : 'Continue')}
                </Button>
            </div>
        </div>
    );
};

export default SkillsChoose;
