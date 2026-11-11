import React from 'react';
import { X, Download, FileText } from 'lucide-react';
import { Regulation } from '../types';

interface Props {
  regulation: Regulation | null;
  onClose: () => void;
  highlightClause?: string;
}

export const DocumentViewerModal: React.FC<Props> = ({ regulation, onClose, highlightClause }) => {
  if (!regulation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-dut-outline-variant/50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-dut-surface-container border-b border-dut-outline-variant/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-dut-primary/10 rounded-lg text-dut-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {regulation.documentNumber}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-dut-on-surface line-clamp-1 mt-0.5">
                {regulation.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {regulation.pdfUrl && (
              <a
                href={regulation.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold bg-dut-primary text-white rounded-lg hover:bg-dut-primary-container transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tải PDF gốc</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content View */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-dut-on-surface leading-relaxed">
          <div className="text-center pb-4 border-b border-gray-100">
            <p className="font-semibold uppercase tracking-wider text-xs text-dut-on-surface-variant">
              {regulation.issuer}
            </p>
            <h3 className="text-lg font-bold text-dut-primary mt-1">
              Số: {regulation.documentNumber}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Ban hành ngày: {regulation.issuedDate || 'Đang cập nhật'}
            </p>
          </div>

          <div className="bg-dut-surface-container-low p-4 rounded-xl border border-dut-outline-variant/30">
            <h4 className="font-bold text-xs uppercase tracking-wider text-dut-primary mb-1">
              Trích yếu nội dung:
            </h4>
            <p className="text-dut-on-surface-variant text-sm">
              {regulation.summary || regulation.title}
            </p>
          </div>

          {/* Highlight Notice */}
          {highlightClause && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg text-xs text-amber-900 flex items-center justify-between">
              <span>Đang điều hướng bôi vàng theo trích dẫn: <strong>{highlightClause}</strong></span>
            </div>
          )}

          {/* Document Sample Articles */}
          <div className="space-y-4 pt-2">
            <div>
              <h5 className="font-bold text-dut-primary">Điều 1. Phạm vi điều chỉnh và đối tượng áp dụng</h5>
              <p className="mt-1 text-gray-700">
                Quy định này áp dụng đối với tất cả sinh viên hệ đại học chính quy đang theo học tại Trường Đại học Bách khoa – Đại học Đà Nẵng.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-dut-primary">Điều 2. Nguyên tắc và nguồn kinh phí xét cấp</h5>
              <p className="mt-1 text-gray-700">
                1. Học bổng khuyến khích học tập được xét và cấp theo từng học kỳ cho sinh viên có kết quả học tập và rèn luyện từ loại Khá trở lên, không bị kỷ luật từ mức khiển trách trở lên trong học kỳ xét học bổng.
              </p>
              <p className="mt-1 text-gray-700">
                2. Học bổng được xét duyệt công khai, dân chủ và minh bạch dựa trên chỉ tiêu ngân sách và quỹ học bổng do Hiệu trưởng phê duyệt.
              </p>
            </div>

            <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
              <h5 className="font-bold text-dut-primary">Điều 4. Tiêu chuẩn và mức xét cấp học bổng</h5>
              <p className="mt-2 text-gray-800">
                Sinh viên đạt tiêu chuẩn xét học bổng nếu tích lũy tối thiểu <span className="doc-highlight">15 tín chỉ</span> trong học kỳ chính, không có môn thi lần đầu dưới điểm D:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1.5 text-gray-800">
                <li>
                  <span className="font-semibold text-dut-primary">Học bổng Loại Xuất sắc:</span>{' '}
                  <span className="doc-highlight">ĐTBCHK lần 1 ≥ 9.00</span> và{' '}
                  <span className="doc-highlight">ĐRL ≥ 90 điểm</span>.
                </li>
                <li>
                  <span className="font-semibold text-dut-primary">Học bổng Loại Giỏi:</span>{' '}
                  <span className="doc-highlight">ĐTBCHK lần 1 từ 8.00 đến 8.99</span> và{' '}
                  <span className="doc-highlight">ĐRL ≥ 80 điểm</span>.
                </li>
                <li>
                  <span className="font-semibold text-dut-primary">Học bổng Loại Khá:</span>{' '}
                  <span className="doc-highlight">ĐTBCHK lần 1 từ 7.00 đến 7.99</span> và{' '}
                  <span className="doc-highlight">ĐRL ≥ 65 điểm</span>.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-dut-surface-container border-t border-dut-outline-variant/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dut-primary text-white text-xs font-semibold rounded-lg hover:bg-dut-primary-container transition-colors"
          >
            Đóng trình đọc
          </button>
        </div>
      </div>
    </div>
  );
};
