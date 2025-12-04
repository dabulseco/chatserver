import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Background from '@/assets/login.png';
import Victory from '@/assets/victory.svg';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { apiClient } from '@/lib/api-client';
import { LOGIN_URL, SIGNUP_URL } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateSignup = () => {
    if (!email || !password || !confirmPassword) {
      toast.error('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      const res = await apiClient.post(LOGIN_URL, { email, password }, { withCredentials: true });
      if(res.data.user.id) {
        setUserInfo(res.data.user);
        if(res.data.user.profileSetup) {
          navigate('/chat');
        } else { 
          navigate('/profile');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    }

  }

  const handleSignup = async () => {
    if (validateSignup()) {
      const res = await apiClient.post(SIGNUP_URL, { email, password, confirmPassword }, {
        withCredentials: true,
      });
      if(res.status === 201) {
        setUserInfo(res.data.user);
        navigate('/profile');
      }
    }
  }


  return (
    <div className="h-[100vh] w-[100vw] flex iterms-center justify-center">
      <div className="h-[95vh] bg-white border-white text-opacity-90 
      shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col items-center gap-10 justify-center">
          <div className="flex items-center justify-center flex-col">
              <h1 className="text-xl font-bold md:text-4xl">Welcome to Chat App</h1>
              <img src={Victory} alt="victorey" className="h-[100px]" />
              <p className="font-mediun text-center">
                Fill the details to get started with the Chat app
              </p>
              <div className="flex items-center justify-center w-full">
                <Tabs className="w-3/4" defaultValue="login">
                  <TabsList className="bg-transparent rounded-none w-full">
                    <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black
                    text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black 
                    data-[state=active]:font-semibold data-[state=active]:border-b-yellow-500 p-3 transition-all duration-300">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="data-[state=active]:bg-transparent text-black
                    text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black 
                    data-[state=active]:font-semibold data-[state=active]:border-b-yellow-500 p-3 transition-all duration-300">
                      Register
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent className="flex flex-col gap-5 mt-5" value="login">
                    <div className="flex flex-col gap-4">
                      <Input 
                       placeholder="Email" 
                       type="email" 
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       className="p-6 border rounded-full" />
                      <Input 
                       placeholder="Password" 
                       type="password" 
                       onChange={(e) => setPassword(e.target.value)}
                       value={password}
                       className="p-6 border rounded-full" />
                       <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                    </div>

                  </TabsContent>
                  <TabsContent className="flex flex-col gap-5" value="register">
                    <div className="flex flex-col gap-4">
                      <Input 
                       placeholder="Email" 
                       type="email" 
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       className="p-6 border rounded-full" />
                      <Input 
                       placeholder="Password" 
                       type="password" 
                       onChange={(e) => setPassword(e.target.value)}
                       value={password}
                       className="p-6 border rounded-full" />
                      <Input 
                       placeholder="confirm Password" 
                       type="password" 
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       value={confirmPassword}
                       className="p-6 border rounded-full" />
                      <Button className="rounded-full p-6" onClick={handleSignup}>SignUp</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
          </div>
        </div>  
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="background" className="h-[500px]" />
        </div>
      </div>
    </div>
  )
}
export default Auth;