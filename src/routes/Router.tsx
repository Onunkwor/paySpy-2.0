import { OnBoarding } from "@/components/Authentication/onBoarding/onBoarding";
import { AuthProvider } from "@/context/AuthProvider";
import { OnBoardingProvider } from "@/context/OnBoarding.Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HideAuthRoute, ProtectedRoutes } from "./ProtectedRoutes";
import Home from "@/pages/Home";
import Login from "@/components/Authentication/Login/Login";
import { LoginProvider } from "@/context/Login.Provider";
import ProductDetails from "@/pages/ProductDetails";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <ProtectedRoutes>
          <ProductDetails />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/signup",
      element: (
        <HideAuthRoute>
          <OnBoarding />
        </HideAuthRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <HideAuthRoute>
          <Login />
        </HideAuthRoute>
      ),
    },
  ]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoginProvider>
          <OnBoardingProvider>
            <RouterProvider router={router} />
          </OnBoardingProvider>
        </LoginProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
