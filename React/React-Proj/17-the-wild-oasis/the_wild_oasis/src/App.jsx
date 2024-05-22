import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Booking from "./pages/Booking";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Checkin from "./pages/Checkin";
import { DarkModeProvider } from "./context/DarkModeContext";

// this is where everything will be cached
const queryClient = new QueryClient({
  defaultOption: {
    queries: {
      // staleTime: 60 * 1000, time it takes data to be stale to allow refetching
      staleTime: 0,
    },
  },
});

// same concept -> store at one place -> provide to the app

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                // concl -> need to apply it to all pages -> main compo opt. -> perform some steps new compo instead declarative.
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="user" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        {/* func. returns an object which also contains toast prprty ->  */}
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;

// import styled from "styled-components";
// import GlobalStyles from "./styles/GlobalStyles";
// import Button from "./ui/Button";
// import Input from "./ui/Input";
// import Heading from "./ui/Heading";
// import Row from "./ui/Row";

// // returns a react component which can be used in jsx, pros => resolves the prblm of similar class names in global css, the css defined will be scoped to that component only & we can use that compo anywhere, || can apply all props of html elements
// const H1 = styled.h1`
//   font-size: 30px;
//   font-weight: 600;
// `;

// // name convention of main compo
// const StyledApp = styled.div`
//   /* background-color: orangered; */
// `;

// function App() {
//   return (
//     <>
//       {/* can't accept any children */}
//       <GlobalStyles />
//       <StyledApp>
//         {/* in tailwind u might avoid it & repeat the classes -> more control here , can be done using @apply but no js logic, tailwind>>>*/}
//         <Row>
//           <Row type="horizontal">
//             <Heading type="h1">The Wild Oasis</Heading>
//             <div>
//               <Heading type="h2">Check in and out</Heading>
//               <Button onClick={() => alert("Static")}>Check In</Button>
//               <Button
//                 variation="secondary"
//                 size="small"
//                 onClick={() => alert("Static")}
//               >
//                 Check In
//               </Button>
//             </div>
//           </Row>
//           <Row>
//             <Heading type="h3">Form</Heading>
//             <form>
//               <Input placeholder="Number of Guests" />
//               <Input placeholder="Number of Guests" />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   );
// }

// export default App;

// // Building a custom design system highly optimised

// netlify -> toml file -> routing is handled on client side -> netlify spa's has only one index.html file so upon accessing any route netlify runs index.html which gives the content to client & then client takes over and handles the routing.
