import { OnBoarding } from "@/components/Authentication/onBoarding/onBoarding";
import { OnBoardingProvider } from "@/context/OnBoarding.Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <OnBoarding />,
    },
  ]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <OnBoardingProvider>
        <RouterProvider router={router} />
      </OnBoardingProvider>
    </QueryClientProvider>
  );
};
