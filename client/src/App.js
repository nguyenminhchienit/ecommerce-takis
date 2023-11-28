import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public } from "./pages/public";
import path from "./utils/path";
import { apiGetCategories } from "./store/app/asyncActions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiGetCategories());
  }, []);
  return (
    <div className="min-h-screen font-main h-[2000px]">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
