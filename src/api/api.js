export const BASE_URL = "https://dl-back.km-dev.tech"
export const SKILLS_URL = "https://27fd-2-133-130-122.ngrok-free.app"
const token = 'cXVlcnlfaWQ9QUFGRUR6Uk5BQUFBQUVRUE5FMG50bzRIJnVzZXI9JTdCJTIyaWQlMjIlM0ExMjk1MjU3NDEyJTJDJTIyZmlyc3RfbmFtZSUyMiUzQSUyMkRhbmlpbCUyMiUyQyUyMmxhc3RfbmFtZSUyMiUzQSUyMiUyMiUyQyUyMnVzZXJuYW1lJTIyJTNBJTIyZDlBMm5ZM0ElMjIlMkMlMjJsYW5ndWFnZV9jb2RlJTIyJTNBJTIyZW4lMjIlMkMlMjJpc19wcmVtaXVtJTIyJTNBdHJ1ZSUyQyUyMmFsbG93c193cml0ZV90b19wbSUyMiUzQXRydWUlN0QmYXV0aF9kYXRlPTE3MjkwMDQxODgmaGFzaD1iYWQ4MGY2ZWRjMjQyOGFmYTg1YjUwOTlhNDAyMGNkMjI0YjRlOWQ4N2FiOTYzMmVmNGYxMGExNGRmNzRiNDNj'

// Base fetch function for main API
export const fetchData = async (url, method, body = {}) => {
    if(method === "GET") {
        const response = await fetch(BASE_URL+url, {
            headers: {
                "ngrok-skip-browser-warning": "1",
                Authorization: token
            }
        }).then(res => res.json())
        return response
        
    } else {
        const response = await fetch(BASE_URL+url , {
            method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "1",
                Authorization: token
            }
        }).then(res => res.json())

        return response
    }
}

// New fetch function specifically for skills API
const fetchSkillsData = async (url, method, body = {}) => {
    try {
        const headers = {
            "ngrok-skip-browser-warning": "1",
            Authorization: token
        };

        if (method !== "GET") {
            headers["Content-Type"] = "application/json";
        }

        const options = {
            method,
            headers,
            ...(method !== "GET" && { body: JSON.stringify(body) })
        };

        const response = await fetch(`${SKILLS_URL}${url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Skills API Error:', error);
        throw error;
    }
};

// Skills-related functions using the new base URL
export const getUserSkills = async (telegramId) => {
    try {
        const response = await fetchSkillsData(`/api/skills/${telegramId}`, 'GET');
        console.log('Raw skills response:', response);
        
        // Ensure we return a consistent structure
        return {
            success: true,
            skills: Array.isArray(response.skills) ? response.skills : []
        };
    } catch (error) {
        console.error('Error fetching user skills:', error);
        return {
            success: false,
            skills: []
        };
    }
};

export const updateUserSkills = async (telegramId, skills) => {
    try {
        const response = await fetchSkillsData('/api/skills', 'POST', {
            telegram_id: telegramId,
            skills: skills
        });
        return response;
    } catch (error) {
        console.error('Error updating user skills:', error);
        throw error;
    }
};
// ... existing code ...

export const getCourseRecommendations = async (telegramId) => {
    try {
        const response = await fetchSkillsData(`/api/recommend/${telegramId}`, 'GET');
        return response;
    } catch (error) {
        console.error('Error getting recommendations:', error);
        throw error;
    }
};