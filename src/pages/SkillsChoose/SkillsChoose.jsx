import React, { useState } from 'react';
import { Button } from "@telegram-apps/telegram-ui";
import './SkillsSelection.css';

const SkillsChoose = () => {
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
            if (selectedSkills.length < 5) {
                setSelectedSkills([...selectedSkills, skillId]);
            }
        }
    };

    return (
        <div className="skills-container">
            <div className="banner">
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
                        {selectedSkills.includes(skill.id) && (
                            <div className="selected-indicator">✓</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="skills-footer">
                <span className="skills-counter">
                    {selectedSkills.length}/5 selected
                </span>
                <Button 
                    disabled={selectedSkills.length === 0}
                    onClick={() => console.log('Selected skills:', selectedSkills)}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default SkillsChoose; 