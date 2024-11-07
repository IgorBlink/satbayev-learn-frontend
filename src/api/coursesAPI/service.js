import { fetchData } from "../api"


export const coursesAPI = {
    async getCourses() {
        return fetchData(`/api/courses`, "GET")
    }, 
    async getCoursesByCategory(category) {
        return fetchData(`/api/courses/category/${category}`, "GET")
    }, 
    async getCourse(id) {
        return fetchData(`/api/courses/${id}`, "GET")
    }, 
    async startCourse(id) {
        return fetchData(`/api/courses/${id}/start`, "POST")
    },
    async getModules(id) {
        return fetchData(`/api/courses/${id}/modules`, "GET")
    }, 
    async getModule(id, module) {
        return fetchData(`/api/courses/${id}/modules/${module}`, "GET")
    }, 
    async startModule(id, module) {
        return fetchData(`/api/courses/${id}/modules/${module}/start`, "POST")
    },
    async nextModule(id, module) {
        return fetchData(`/api/courses/${id}/modules/${module}/next`, "POST")
    },
}