// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { baseuRL } from "../Api/Api";
// import { toast } from "react-toastify";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const cookie = new Cookies();
//   const [token, setToken] = useState(cookie.get("token") || null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUserData = async (currentToken) => {
//     try {
//       const response = await axios.get(`${baseuRL}/Auth/me`, {
//         headers: { Authorization: `Bearer ${currentToken}` },
//       });
//       setUser(response.data);
//     } catch (err) {
//       console.log("خطأ في جلب البيانات", err);
//       logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchUserData(token);
//     } else {
//       setLoading(false);
//     }
//   }, [token]);

//   const loginData = (newToken, userData) => {
//     cookie.set("token", newToken, { path: "/" });
//     setToken(newToken);
//     if (userData) {
//       setUser(userData);
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     cookie.remove("token", { path: "/" });
//     toast.error("تم تسجيل الخروج");
//     setToken(null);
//     setUser(null);
//   };
//   const updateProfileData = async (profileData, usernameData,craftManprofile) => {
//     try {
//       const headers = { Authorization: `Bearer ${token}` };

//       if (usernameData && usernameData !== user?.account?.userName) {
//         await axios.put(
//           `${baseuRL}/Auth/me/username`,
//           { userName: usernameData },
//           { headers },
//         );
//       }
//       if(user.craftManID &&craftManprofile){
//         await axios.put(`${baseuRL}/Auth/me/craftman`,{craftManprofile},{ headers })
//       }

//       await axios.put(`${baseuRL}/Auth/me/profile`, profileData, { headers });

//       await fetchUserData(token);
//       toast.success("تم تعديل البيانات بنجاح");
//       return true;
//     } catch (error) {
//       toast.error("حدث خطأ يرجى اعادة المحاولة ");
//       console.error("خطأ في التحديث", error);
//       return false;
//     }
//   };
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         loading,
//         loginData,
//         logout,
//         setToken,
//         updateProfileData,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { baseuRL } from "../Api/Api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const cookie = new Cookies();
  const [token, setToken] = useState(cookie.get("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (currentToken) => {
    try {
      const response = await axios.get(`${baseuRL}/Auth/me`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      setUser(response.data);
    } catch (err) {
      console.log("خطأ في جلب البيانات", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const loginData = (newToken, userData) => {
    cookie.set("token", newToken, { path: "/" });
    setToken(newToken);
    if (userData) {
      setUser(userData);
      setLoading(false);
    }
  };

  const logout = () => {
    cookie.remove("token", { path: "/" });
    toast.error("تم تسجيل الخروج");
    setToken(null);
    setUser(null);
  };

  const updateProfileData = async (
    profileData,
    usernameData,
    craftManprofile,
  ) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (usernameData && usernameData !== user?.account?.userName) {
        await axios.put(
          `${baseuRL}/Auth/me/username`,
          { userName: usernameData },
          { headers },
        );
      }

      if (craftManprofile) {
        await axios.put(`${baseuRL}/Auth/me/craftsman`, craftManprofile, {
          headers,
        });
      }

      await axios.put(`${baseuRL}/Auth/me/profile`, profileData, { headers });

      await fetchUserData(token);
      toast.success("تم تعديل البيانات بنجاح");
      return true;
    } catch (error) {
      toast.error("حدث خطأ يرجى اعادة المحاولة ");
      console.error("خطأ في التحديث", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginData,
        logout,
        setToken,
        updateProfileData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
