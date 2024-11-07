import { fetchData } from "../api"


export const userAPI = {
    async getUser() {
        return fetchData("/api/user/me", "GET")
    }, 
    async getUserCourses() {
        return fetchData("/api/user/courses", "GET")
    }, 
    async getUserCourse(id) {
        return fetchData(`/api/courses/${id}/my`, "GET")
    }, 
    async getUserHistory() {
        return fetchData("/api/user/balance/history", "GET")
    },
    async getRating() {
        return fetchData("/api/rating", "GET")
    },
    async getRatingMe() {
        return fetchData("/api/rating/me", "GET")
    },
    async postWithdraw(address) {
        return fetchData("/api/user/withdraw", "POST", {address})
    },
    async canClaimSBT(course) {
        return fetchData(`/api/courses/${course}/claim`, "GET")
    },
    async claimSBT(course , wallet) {
        return fetchData(`/api/courses/${course}/claim`, "POST", {wallet: wallet})
    },
    async getTestData(course, module) {
        return fetchData(`/api/courses/${course}/modules/${module}/test`, "GET")
        
    },
    async sendTestData(course, module, answers) {
        return fetchData(`/api/courses/${course}/modules/${module}/test`, "POST", {answers})
        
    },
    async getHomework(course, module) {
        return fetchData(`/api/courses/${course}/modules/${module}/homework`, "GET")
        
    },
    async postHomework(course, module, content) {
        return fetchData(`/api/courses/${course}/modules/${module}/homework`, "POST", {content})
        
    }
    
}