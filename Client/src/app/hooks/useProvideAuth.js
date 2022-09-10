import { useState } from "react";
import { toast } from "react-toastify";

function useProvideAuth() {

  const [user, setUser] = useState(null);

  const signIn = (name, token, image) => {
    localStorage.setItem('token', token)
    localStorage.setItem('name', name);
    localStorage.setItem('image', image);
    setUser({ name, token, image })
  }

  const signOut = () => {
    toast.success('Logout Successfully!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    localStorage.clear()
    setUser(null)

  }

  const verifyToken = () => {
    const token = localStorage.getItem('token')
    const name  = localStorage.getItem('name')
    const image = localStorage.getItem('image');

    if (token) {
      setUser({ name, token, image })
    }
  }

  return {
    user,
    signIn,
    signOut,
    verifyToken
  };
}

export default useProvideAuth;