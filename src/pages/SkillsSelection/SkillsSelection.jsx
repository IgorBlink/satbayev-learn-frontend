import React, { useState } from 'react';
import './SkillsSelection.css';
import { userAPI } from '../../api/userAPI/service';
import { useNotification } from '../../helpers/Notificathions';

const SkillsSelection = () => {
    const { showNotification } = useNotification();
    const [selectedSkills, setSelectedSkills] = useState([]);

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

    const toggleSkill = (skillId) => {
        if (selectedSkills.includes(skillId)) {
            setSelectedSkills(selectedSkills.filter(id => id !== skillId));
        } else {
            if (selectedSkills.length < 5) { // Limit to 5 selections
                setSelectedSkills([...selectedSkills, skillId]);
            } else {
                showNotification("Warning", "You can select up to 5 skills", "warning");
            }
        }
    };

    const handleSubmit = async () => {
        if (selectedSkills.length === 0) {
            showNotification("Error", "Please select at least one skill", "error");
            return;
        }

        const response = await userAPI.updateUserSkills(selectedSkills);
        if (response.success === false) {
            showNotification("Error", response.data.error, "error");
            return;
        }
    };

    return (
        <div className="skills-container">
            <div className="banner b-img">
                <div className="content">
                    <h1 className="title">Choose Your Path</h1>
                    <p className="description">Select up to 5 technologies you want to master</p>
                </div>
            </div>

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
                <span className="skills-counter">
                    {selectedSkills.length}/5 selected
                </span>
                <button 
                    className="continue-button"
                    onClick={handleSubmit}
                    disabled={selectedSkills.length === 0}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default SkillsSelection; 