import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, ExternalLink, Eye, Download } from 'lucide-react';
import { regulationApi } from '../services/api';
import { Regulation } from '../types';
import { DocumentViewerModal } from '../components/DocumentViewerModal';

export const CatalogPage: React.FC = () => {
  const [category, setCategory] = useState<string>('ALL');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<Regulation | null>(null);

  const { data: regulations, isLoading } = useQuery({
    queryKey: ['regulations', category, keyword],
    queryFn: () => regulationApi.search(category, keyword),
  });

  const categories = [
    { id: 'ALL', label: 'Tất cả lĩnh vực' },
    { id: 'HOC_BONG', label: 'Học bổng & Hỗ trợ tài chính' },
    { id: 'HOC_VU', label: 'Học vụ & Tín chỉ' },
    { id: 'THU_TUC_MOT_CUA', label: 'Thủ tục Một cửa' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-dut-primary to-blue-800 text-white p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-blue-200">
            Kho dữ liệu số hóa
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Tra cứu Văn bản Pháp quy & Quy chế
          </h2>
          <p className="text-sm text-blue-100 mt-2 max-w-2xl">
            Chuẩn hóa hệ thống văn bản pháp quy, quy định đào tạo tín chỉ và chính sách sinh viên của Trường Đại học Bách khoa – ĐHĐN.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://dut.udn.vn/VanBanPhapQuy/page/1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold backdrop-blur-sm transition-colors"
          >
            <span>Cổng Pháp quy DUT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-dut-outline-variant/30 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm theo số hiệu (1414/QĐ), tên quy định hoặc trích yếu..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-dut-surface-container-low border border-dut-outline-variant/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-dut-primary focus:bg-white transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <Filter className="w-4 h-4 text-dut-outline mr-1 hidden sm:block" />
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                category === c.id
                  ? 'bg-dut-primary text-white shadow-sm'
                  : 'bg-dut-surface-container hover:bg-dut-surface-container-high text-dut-on-surface-variant'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Regulation List Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-sm text-gray-500">Đang tải danh mục văn bản...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regulations?.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-dut-outline-variant/30 hover:border-dut-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-dut-primary/10 text-dut-primary">
                    {doc.documentNumber}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {doc.issuedDate}
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-dut-on-surface line-clamp-2 hover:text-dut-primary transition-colors">
                  {doc.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 line-clamp-3">
                  {doc.summary || 'Chưa có trích yếu tóm tắt.'}
                </p>
                <div className="mt-3 text-[11px] text-gray-400 font-medium">
                  Ban hành: {doc.issuer}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="flex items-center space-x-1.5 text-xs font-semibold text-dut-primary hover:text-dut-primary-container"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem số hóa</span>
                </button>
                {doc.pdfUrl && (
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-dut-primary"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Document Viewer */}
      <DocumentViewerModal
        regulation={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
};
