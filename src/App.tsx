import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Verify } from './pages/Verify';
import { PinScreen } from './pages/PinScreen';
import { BankInfo } from './pages/BankInfo';
import { PersonalDetails } from './pages/PersonalDetails';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/pin" element={<PinScreen />} />
        <Route path="/bank-info" element={<BankInfo />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
      </Routes>
    </BrowserRouter>);

}