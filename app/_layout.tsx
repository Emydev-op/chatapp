import { Slot, Stack, useRouter, useSegments } from "expo-router";
import "react-native-reanimated";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";


const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      //Redirect to home
      router.replace("Home")
    } else if (isAuthenticated == false) {
      //Redirect to sign in
      router.replace("SignIn")
    }
  }, [isAuthenticated]);
  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
