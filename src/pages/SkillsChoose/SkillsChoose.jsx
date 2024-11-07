import React, { useState } from 'react';
import { Button } from "@telegram-apps/telegram-ui";

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
        <div className="p-4 min-h-screen bg-[var(--tg-theme-bg-color)]">
            {/* Banner */}
            <div className="relative -mx-4 -mt-4 mb-6 py-10 px-5 bg-gradient-to-br from-[var(--tg-theme-button-color)] to-[var(--tg-theme-link-color)] text-center rounded-b-3xl">
                <h1 className="text-[28px] font-bold mb-2 text-[var(--tg-theme-button-text-color)]">
                    Choose Your Path
                </h1>
                <p className="text-base text-[var(--tg-theme-button-text-color)] opacity-90">
                    Select up to 5 technologies you want to master
                </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6 pb-24 md:grid-cols-4 md:max-w-[900px] md:mx-auto animate-fadeIn">
                {skills.map((skill, index) => (
                    <div
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`
                            relative flex flex-col items-center gap-3 p-5
                            rounded-2xl cursor-pointer overflow-hidden
                            transition-all duration-300 ease-in-out
                            border-2 border-transparent
                            ${selectedSkills.includes(skill.id)
                                ? 'bg-[var(--tg-theme-link-color)] scale-97 shadow-lg border-[var(--tg-theme-button-text-color)]'
                                : 'bg-[var(--tg-theme-secondary-bg-color)] hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--tg-theme-link-color)]'
                            }
                            animate-float
                        `}
                        style={{
                            animationDelay: `${index * 100}ms`,
                            animationFillMode: 'forwards'
                        }}
                    >
                        <span className={`
                            text-3xl transition-transform duration-300
                            ${selectedSkills.includes(skill.id)
                                ? 'scale-110 animate-pulse'
                                : 'hover:scale-110'
                            }
                        `}>
                            {skill.icon}
                        </span>
                        <span className={`
                            text-sm font-medium text-center transition-colors duration-300
                            ${selectedSkills.includes(skill.id)
                                ? 'text-[var(--tg-theme-button-text-color)]'
                                : 'text-[var(--tg-theme-text-color)]'
                            }
                        `}>
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--tg-theme-bg-color)] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex flex-col gap-3 backdrop-blur-sm border-t border-[var(--tg-theme-text-color)] border-opacity-10">
                <span className="text-center text-[var(--tg-theme-hint-color)] text-sm font-medium tracking-wide">
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