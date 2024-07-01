import React, { Suspense, lazy, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Footer from "../layout/Footer";

// Lazy load components
const MainHeader = lazy(() => import("../layout/MainHeader"));
const HotelService = lazy(() => import("../common/HotelService"));
const Parallax = lazy(() => import("../common/Parallax"));
const RoomCarousel = lazy(() => import("../common/RoomCarousel"));
const RoomSearch = lazy(() => import("../common/RoomSearch"));

const Home = () => {
    const location = useLocation();
    const message = location.state && location.state.message;
    const currentUser = localStorage.getItem("name");

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <section>
                {message && <p className="text-warning px-5">{message}</p>}
                {currentUser && (
                    <h6 className="text-success text-center">You are logged-In as {currentUser}</h6>
                )}
                <MainHeader />
                <div className="container">
                    <RoomSearch />
                    <RoomCarousel />
                    <Parallax />
                    

                    <HotelService />
                    <Footer />
                </div>
            </section>
        </Suspense>
    );
};

export default Home;
