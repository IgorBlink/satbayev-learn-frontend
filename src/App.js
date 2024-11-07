import { Navigate, Route, Routes } from 'react-router-dom'; 
import { createContext, useEffect, useState } from 'react'; 
import { userAPI } from './api/userAPI/service'; 
import { useNotification } from './helpers/Notifications'; 
import Loader from './helpers/Loader'; 
import Main from './pages/Main/Main'; 
import MyCourses from './pages/MyCourses/MyCourses'; 
import Statistics from './pages/Statistics/Statistics'; 
import VibrateModule from './helpers/VibrateModule'; 
import CoursesByCategory from "./pages/CoursesByCategory/CoursesByCategory"; 
import Course from "./pages/Course/Course"; 
import OverviewBlocks from './components/OverviewBlocks/OverviewBlocks';
import TopLider from "./pages/TopLider/TopLider";
import History from "./pages/History/History";
import Module from './pages/Module/Module';
import Question from "./pages/Question/Question";
import ResultTest from "./pages/ResultTesting/ResultTest";
import TestPage from './pages/TestPage/Test';
import Hometask from './pages/Hometask/Hometask';
import SkillsChoose from './pages/SkillsChoose/SkillsChoose';
import { Background } from './helpers/Background'; // Corrected spelling
import { getUserSkills, updateUserSkills } from './api/api'; // Import the function to get/update user skills

// Create UserContext with default values
export const UserContext = createContext({ 
  user: null,
  courses: [],
  setUser: () => {},
  fetchUser: () => {}
}); 

function App() { 
  const { showNotification } = useNotification(); 

  // State Variables
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState(null); // State to store user skills
  const [isUserLoading, setIsUserLoading] = useState(true); // Loading state for user
  const [isSkillsLoading, setIsSkillsLoading] = useState(true); // Loading state for skills

  // Function to fetch user data
  const fetchUser = async () => { 
    try {
      const response = await userAPI.getUser(); 
      console.log('fetchUser response:', response);
      if(response.success === false) { 
        showNotification("Error", response.data.error, "error"); 
        setIsUserLoading(false);
        return;
      } 
      setUser(response.data); 
    } catch (error) {
      console.error('Error fetching user:', error);
      showNotification("Error", "Failed to fetch user data", "error");
    } finally {
      setIsUserLoading(false);
    }
  }; 

  // Function to fetch user skills based on telegramId
  const fetchSkills = async (telegramId) => {
    try {
      const response = await getUserSkills(telegramId);
      console.log('fetchSkills response:', response);
      if (response.success === false) {
        showNotification('Error', response.data.error, 'error');
        setSkills([]); // Set to empty array to trigger redirect
      } else {
        setSkills(response.skills || []);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      showNotification("Error", "Failed to fetch skills", "error");
      setSkills([]); // Set to empty array to trigger redirect
    } finally {
      setIsSkillsLoading(false);
    }
  };

  // useEffect to fetch user data on component mount
  useEffect(() => { 
    const htmlElement = document.documentElement;
    window?.Telegram?.WebApp?.expand();
    window?.Telegram?.WebApp?.disableVerticalSwipes();

    if (htmlElement.classList.contains('dark')) {
      window?.Telegram?.WebApp?.setBackgroundColor("#000000");
      window?.Telegram?.WebApp?.setHeaderColor("#000000");
    }

    fetchUser(); 
  }, []); 

  // useEffect to fetch skills once user data is available
  useEffect(() => {
    if (user?.user?.telegramId) {
      fetchSkills(user.user.telegramId);
    } else if (user) {
      // If user data is available but no telegramId, stop loading and show error
      setIsSkillsLoading(false);
      showNotification("Error", "Telegram ID not found", "error");
    }
  }, [user, showNotification]);

  // Debugging Logs
  console.log('User:', user);
  console.log('Skills:', skills);

  // Conditional Rendering Based on Loading States and User Data

  if (isUserLoading || isSkillsLoading) return <Loader />; 
  if (user?.user?.newUser) return <OverviewBlocks />;

  // Redirect to SkillsChoose if skills array is empty and user is not new
  if (skills === null && !user?.user?.newUser) {
    return <Navigate to="/skillschoose" replace />;
  }

  return ( 
    <UserContext.Provider value={{ 
      user: user.user,
      courses:  user.courses,
      setUser,
      fetchUser
    }}> 
      <div className="app"> 
        <Routes> 
          <Route path='/' element={<Main />}/> 
          <Route path='/statistics' element={<Statistics />}/> 
          <Route path='/courses' element={<MyCourses />}/> 
          <Route path='/courses/:id' element={<CoursesByCategory />}/> 
          <Route path='/course/:id' element={<Course />}/> 
          <Route path='/courses/:id/modules/:moduleId' element={<Module />}/> 
          <Route path='/courses/:id/modules/:moduleId/test' element={<TestPage />}/> 
          <Route path='/courses/:id/modules/:moduleId/homework' element={<Hometask />}/> 
          <Route path='/top' element={<TopLider />}/>
          <Route path='/history' element={<History />}/>
          <Route path='/question/:id' element={<Question />}/>
          <Route path='/result/:id' element={<ResultTest />}/>
          <Route path='/skillschoose' element={<SkillsChoose/>}/>
          <Route path='/*' element={<Navigate to="/" />}/>
        </Routes> 
      </div> 
    </UserContext.Provider> 
  ); 
} 

export default App;
