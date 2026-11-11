import React from 'react';
import { User, Award, BookOpen, GraduationCap } from 'lucide-react';
import { Student } from '../types';

interface Props {
  student?: Student;
}

export const AcademicStatusStrip: React.FC<Props> = ({ student }) => {
  // Default values matching MVP if student is loading or mock
  const data = student || {
    fullName: 'Nguyễn Văn An',
    studentCode: '102230001',
    className: '23T_DT1',
    faculty: 'Khoa Công nghệ Thông tin',
    gpa: 8.35,
    trainingPoint: 86,
    accumulatedCredits: 48,
    totalCredits: 135,
  };

  return (
    <div className="bg-dut-surface-container border-b border-dut-outline-variant/30 py-2.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-xs sm:text-sm">
        {/* Student info */}
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-dut-primary text-white flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-dut-on-surface">{data.fullName}</span>
            <span className="text-dut-on-surface-variant ml-1.5 font-mono">({data.studentCode})</span>
            <span className="hidden sm:inline text-dut-outline mx-2">•</span>
            <span className="text-dut-on-surface-variant font-medium">{data.className} — {data.faculty}</span>
          </div>
        </div>

        {/* Academic metrics */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-dut-on-surface">
          <div className="flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-dut-primary" />
            <span className="text-dut-on-surface-variant">ĐTBCHK:</span>
            <span className="font-bold text-dut-primary bg-dut-primary/10 px-2 py-0.5 rounded">
              {Number(data.gpa).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span className="text-dut-on-surface-variant">ĐRL:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {data.trainingPoint} đ
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-dut-on-surface-variant">Tín chỉ:</span>
            <span className="font-bold text-dut-on-surface">
              {data.accumulatedCredits}/{data.totalCredits}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
