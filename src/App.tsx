import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { AcademicStatusStrip } from './components/AcademicStatusStrip';
import { CatalogPage } from './pages/CatalogPage';
import { ProcedurePage } from './pages/ProcedurePage';
import { AiChatPage } from './pages/AiChatPage';
import { CalendarPage } from './pages/CalendarPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-dut-surface">
          <Navbar />
          <AcademicStatusStrip />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/procedure" element={<ProcedurePage />} />
              <Route path="/ai-chat" element={<AiChatPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
          </main>
          <footer className="bg-dut-surface-container border-t border-dut-outline-variant/30 py-4 text-center text-xs text-dut-on-surface-variant">
            © 2026 Cổng Dịch vụ và Hỗ trợ Sinh viên — Trường Đại học Bách khoa, Đại học Đà Nẵng
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
