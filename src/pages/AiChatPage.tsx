import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Bot, Send, Sparkles, FileText, ExternalLink, RefreshCw } from 'lucide-react';
import { chatApi } from '../services/api';
import { ChatResponse, Citation } from '../types';
import { DocumentViewerModal } from '../components/DocumentViewerModal';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  citations?: Citation[];
}

export const AiChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Xin chào! Tôi là Trợ lý Học vụ AI của Trường Đại học Bách khoa – ĐHĐN. Tôi có thể giải đáp các thắc mắc về quy chế đào tạo, tiêu chuẩn xét cấp học bổng, thủ tục một cửa và các hạn chót học vụ dựa trên kho văn bản pháp quy chính thức của Nhà trường.',
    },
  ]);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);

  const suggestions = [
    'Tiêu chuẩn học bổng loại Giỏi là bao nhiêu?',
    'Điều kiện số tín chỉ tối thiểu để xét học bổng?',
    'Thủ tục cấp giấy xác nhận tạm hoãn NVQS trực tuyến?',
  ];

  const chatMutation = useMutation({
    mutationFn: (text: string) => chatApi.ask(text, '102230001'),
    onSuccess: (data: ChatResponse) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer,
          citations: data.sources,
        },
      ]);
    },
  });

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');
    chatMutation.mutate(text);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: 'ai',
        text: 'Phiên hội thoại đã được làm mới. Bạn cần hỗ trợ thông tin quy chế hay thủ tục nào?',
      },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-dut-outline-variant/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-dut-primary text-white flex items-center justify-center shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-dut-on-surface flex items-center space-x-2">
              <span>Trợ lý Học vụ AI DUT</span>
              <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                RAG Engine
              </span>
            </h2>
            <p className="text-xs text-dut-on-surface-variant">
              Tự động đối soát và trích dẫn trực tiếp từ các văn bản pháp quy chính thức
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-dut-on-surface-variant hover:text-dut-primary bg-white hover:bg-dut-surface-container rounded-lg border border-dut-outline-variant/30 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Làm mới hội thoại</span>
        </button>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-dut-outline-variant/30 p-4 sm:p-6 shadow-sm min-h-[460px] max-h-[60vh] overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-dut-primary text-white rounded-br-none shadow-sm'
                  : 'bg-dut-surface-container-low border border-dut-outline-variant/30 text-dut-on-surface rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>

              {/* Citations Box if present */}
              {m.citations && m.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-dut-outline-variant/30 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-dut-primary flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Căn cứ pháp lý & Trích dẫn:</span>
                  </span>
                  {m.citations.map((cite, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-white p-2.5 rounded-xl border border-blue-100 flex items-center justify-between gap-2 shadow-xs"
                    >
                      <div>
                        <p className="font-bold text-xs text-dut-primary">
                          {cite.documentNumber} ({cite.clause})
                        </p>
                        <p className="text-[11px] text-gray-600 line-clamp-1">{cite.excerpt}</p>
                      </div>
                      <button
                        onClick={() => setSelectedCitation(cite)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-dut-primary hover:bg-blue-100 rounded-lg flex items-center space-x-1 whitespace-nowrap transition-colors"
                      >
                        <span>Xem bôi vàng</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {chatMutation.isPending && (
          <div className="flex justify-start">
            <div className="bg-dut-surface-container-low p-4 rounded-2xl text-xs text-gray-500 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-dut-primary animate-spin" />
              <span>Đang tra cứu cơ sở dữ liệu pháp quy DUT...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Prompts */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-gray-400">Gợi ý câu hỏi:</span>
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(s)}
            className="text-xs bg-white hover:bg-blue-50 text-dut-primary font-medium px-3 py-1.5 rounded-full border border-dut-outline-variant/40 shadow-2xs transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Đặt câu hỏi học vụ cho Trợ lý AI (ví dụ: điểm rèn luyện bao nhiêu để được loại Giỏi?)..."
          className="flex-1 px-4 py-3 bg-white border border-dut-outline-variant/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-dut-primary"
        />
        <button
          type="submit"
          disabled={!input.trim() || chatMutation.isPending}
          className="px-5 py-3 bg-dut-primary hover:bg-dut-primary-container text-white rounded-xl font-bold text-sm flex items-center space-x-2 disabled:opacity-50 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Gửi câu hỏi</span>
        </button>
      </form>

      {/* Citation Document Viewer Modal */}
      {selectedCitation && (
        <DocumentViewerModal
          regulation={{
            id: 1,
            documentNumber: selectedCitation.documentNumber,
            title: selectedCitation.documentTitle,
            category: 'HOC_BONG',
            issuer: 'Trường Đại học Bách khoa – ĐHĐN',
            issuedDate: '2022-10-15',
            summary: selectedCitation.excerpt,
            pdfUrl: selectedCitation.pdfUrl,
          }}
          highlightClause={selectedCitation.clause}
          onClose={() => setSelectedCitation(null)}
        />
      )}
    </div>
  );
};
