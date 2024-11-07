import React, { useState } from 'react';
import { Button } from "@telegram-apps/telegram-ui";
import './SkillsChoose.css';

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
        <div className="skills-container123">
            <div className="skills-banner123">
                <h1 className="skills-title123">Choose Your Path</h1>
                <p className="skills-subtitle123">Select up to 5 technologies you want to master</p>
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