import './index.css'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Signup from '../pages/signup';
import Createblogs from '../pages/createblogs';
import Getblogs from '../pages/getblogs';
import Login from '../pages/login';
import UserUpdate from '../pages/userUpdate';
import NavBar from '../pages/navBar';
import BlogPage from '../pages/blogPage';
import Updateblogs from '../pages/updateBlog';
import PageNotfound from '../pages/pageNotfound';
import Profile from '../pages/userProfile';
import BlogPage1 from '../pages/userblogs';
import Userfollowers from '../pages/userfollowers';
import Userfollowing from '../pages/userfollowing';
import VerifyUser from '../pages/verifyUser';

function App() {
  

  return (
    <div className='w-screen h-screen overflow-hidden relative bg-gray-200'>
      <Routes>
        <Route path='/' element={<NavBar/>}>
          <Route path='' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/createblog' element={<Createblogs/>}/>
          <Route path='/getblog' element={<Getblogs/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/update' element={<UserUpdate/>}/>
          <Route path='/profile/:userid' element={<Profile/>}/>
          <Route path='/blog/:id' element={<BlogPage/>}/>
          <Route path='/updateblog/:blogid' element={<Updateblogs/>}/>
          <Route path='/user/blogs' element={<BlogPage1/>}/>
          <Route path='/user/followers/:userid' element={<Userfollowers/>}/>
          <Route path='/user/following/:userid' element={<Userfollowing/>}/>
          <Route path='verify/:token' element={<VerifyUser/>}/>
          <Route path='*' element={<PageNotfound/>}/>
        </Route>
      </Routes>
    </div>
  )

}

export default App
