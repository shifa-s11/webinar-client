import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WebinarList from "./pages/WebinarList";
import WebinarDetail from "./pages/WebinarDetail";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Header />

      <Routes>
        <Route path="/" element={<WebinarList />} />
        <Route path="/webinars" element={<WebinarList />} />
        <Route path="/webinars/:id" element={<WebinarDetail />} />
      </Routes>

      <Footer />
       <Toaster
        position="top-right"
        richColors
        theme="dark"
      />
    </div>
  );
}

export default App;



