import React, { useState, memo, useCallback } from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

//index
//Conecpets [Stat-driven - componed-based - JSX]
//componet [class - function]
//state [class - function]
//JSX
// tailwind
//component lifecycle - side effect logic [useEffect, event handel]
//hooks [useState, useRef, useEffect, useCallback, useMemo]
//optimize react app [memo(), useCallback, useMemo]
//routing => [react-router-dom]
//client-side render => issues  [Performance, SEO]
//Authentication - Autheorization

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Routes>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes> */}
    </>
  );
}

export default App;
