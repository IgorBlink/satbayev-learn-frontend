import { Navigate, Route, Routes } from 'react-router'; 
import { createContext, useEffect, useState } from 'react'; 
import { userAPI } from './api/userAPI/service'; 
import { useNotification } from './helpers/Notificathions'; 
import Loader from './helpers/Loader'; 
import Main from './pages/Main/Main'; 
import MyCourses from './pages/MyCourses/MyCourses'; 
import Statistics from './pages/Statistics/Statistics'; 
import VibrateModule from './helpers/VibrateModule'; 
import {ReactDOM} from "react" 
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
import SkillsChoose from './pages/SkillsChoose/SkillsChoose'
import { Backgroun } from './helpers/Background';
import { getUserSkills, updateUserSkills } from './api/api';
export const UserContext = createContext({ 
  user: null 
}) 
 
function App() { 
  const { showNotification } = useNotification(); 
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isSkillsLoading, setIsSkillsLoading] = useState(false);  
 
  const fetchUser = async () => { 
    setIsUserLoading(true);
    try {
      const response = await userAPI.getUser(); 
      console.log('fetchUser response:', response);
      
      if(response.success === false) { 
        showNotification("Error", response.data.error, "error"); 
        setIsUserLoading(false);
        return;
      } 
      
      setUser(response.data);
      
      // Start skills loading only after successful user fetch
      if (response.data?.user?.telegramId) {
        setIsSkillsLoading(true);
        await fetchSkills(response.data.user.telegramId);
      } else {
        setIsSkillsLoading(false); // Make sure to set loading to false if no telegramId
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      showNotification("Error", "Failed to fetch user data", "error");
    } finally {
      setIsUserLoading(false);
    }
  }; 

  const fetchSkills = async (telegramId) => {
    try {
      const response = await getUserSkills(telegramId);
      console.log('fetchSkills response:', response);
      
      if (!response || response.success === false) {
        console.log('No skills found or error');
        setSkills([]); // Always set to empty array, not null
      } else {
        setSkills(Array.isArray(response.skills) ? response.skills : []);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkills([]); // Set to empty array on error
    } finally {
      setIsSkillsLoading(false);
    }
  };

  useEffect(() => { 
    const htmlElement = document.documentElement;
    window?.Telegram?.WebApp?.expand();
    window?.Telegram?.WebApp?.disableVerticalSwipes();

    if (htmlElement.classList.contains('dark')) {
      window?.Telegram?.WebApp?.setBackgroundColor("#000000");
      window?.Telegram?.WebApp?.setHeaderColor("#000000");
    }

    fetchUser();
  }, []) 

  console.log('User:', user);
  console.log('Skills:', skills);
  console.log('Loading states:', { isUserLoading, isSkillsLoading });

  // Add more detailed logging
  console.log('Debug state:', {
    user,
    skills,
    isUserLoading,
    isSkillsLoading,
    hasNewUser: user?.user?.newUser,
    telegramId: user?.user?.telegramId
  });

  // Show loader while loading
  if (isUserLoading || isSkillsLoading) {
    console.log('Showing loader');
    return <Loader />; 
  }

  // Check for new user first
  if (user?.user?.newUser) {
    console.log('Showing overview blocks for new user');
    return <OverviewBlocks />;
  }

  // Check for skills redirect - simplified condition
  if (user?.user &&  skills?.length === 0) {
    console.log('Redirecting to skills choose');
    return <SkillsChoose />;  
  }

  // If we get here, we should have both user and skills
  console.log('Rendering main app');

  return ( 
    <UserContext.Provider value={{ 
      user: user?.user || null,
      courses: user?.courses || [],
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