import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';

import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import ContactoPage from "./pages/ContactoPage";
import TrabajosPage from "./pages/TrabajosPage";
import LaEmpresaPage from "./pages/LaEmpresaPage";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="Contacto" element={<ContactoPage />} ></Route>
          <Route path="Trabajos" element={<TrabajosPage />} ></Route>
          <Route path="LaEmpresa" element={<LaEmpresaPage />} ></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
