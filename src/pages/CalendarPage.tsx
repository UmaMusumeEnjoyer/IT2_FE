import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, AlertTriangle, Bell, Filter } from 'lucide-react';
import { eventApi } from '../services/api';

export const CalendarPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const { data: events, isLoading } = useQuery({
    queryKey: ['academic-events', filterType],
    queryFn: () => eventApi.getEvents(filterType, 'Khoa Công nghệ Thông tin', '23T_DT1'),
  });

  const filterOptions = [
    { id: 'ALL', label: 'Tất cả mốc sự kiện' },
    { id: 'HOC_BONG', label: 'Học bổng' },
    { id: 'HOC_VU', label: 'Học vụ tín chỉ' },
    { id: 'HOC_PHI', label: 'Học phí' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-dut-on-surface flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-dut-primary" />
            <span>Lịch & Bản tin Học vụ Cá nhân hóa</span>
          </h2>
          <p className="text-sm text-dut-on-surface-variant mt-1">
            Tự động lọc các mốc thời hạn theo Lớp <strong>23T_DT1</strong> — <strong>Khoa Công nghệ Thông tin</strong>.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <Filter className="w-4 h-4 text-dut-outline mr-1 hidden sm:block" />
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilterType(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === opt.id
                  ? 'bg-dut-primary text-white shadow-sm'
                  : 'bg-white hover:bg-dut-surface-container text-dut-on-surface-variant border border-dut-outline-variant/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Timeline / Cards */}
      {isLoading ? (
        <div className="text-center py-12 text-sm text-gray-500">Đang tải lịch sự kiện...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events?.map((ev) => (
            <div
              key={ev.id}
              className={`bg-white rounded-2xl p-5 shadow-sm border transition-all flex flex-col justify-between ${
                ev.isDeadline
                  ? 'border-amber-300 ring-1 ring-amber-100'
                  : 'border-dut-outline-variant/30 hover:border-dut-primary/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      ev.isDeadline
                        ? 'bg-red-100 text-red-800 flex items-center space-x-1'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {ev.isDeadline && <AlertTriangle className="w-3 h-3 mr-1 inline" />}
                    {ev.isDeadline ? 'HẠN CHÓT' : 'SỰ KIỆN'}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(ev.eventDate).toLocaleDateString('vi-VN')}</span>
                  </span>
                </div>

                <h3 className="font-bold text-base text-dut-on-surface line-clamp-2">
                  {ev.title}
                </h3>

                <p className="text-xs text-dut-on-surface-variant mt-2 leading-relaxed">
                  {ev.description || 'Không có mô tả chi tiết.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium text-[11px] text-gray-400">
                  Phạm vi: {ev.classScope !== 'ALL' ? ev.classScope : 'Toàn trường'}
                </span>
                <button
                  onClick={() => alert(`Đã bật nhắc nhở cho sự kiện: ${ev.title}`)}
                  className="flex items-center space-x-1 text-dut-primary hover:text-dut-primary-container font-semibold"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Bật nhắc hẹn</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
