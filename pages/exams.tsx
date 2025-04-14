'use client';

import { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import { Search, Home, ChevronRight, Calendar, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

interface ExamData {
  'Sınav Tarihi': string;
  'Ders Kodu': string;
  'Başlangıç Saati': string;
  'Bitiş Saati': string;
  'Öğretim Elemanı': string;
  'Sınav Yeri': string;
  'Gözetmen': string;
}

const ITEMS_PER_PAGE = 15;

export default function ExamsPage() {
  const { t } = useTranslation('common');
  const [exams, setExams] = useState<ExamData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadExamData() {
      try {
        const response = await fetch('/documents/exam_list.xlsx');
        
        if (!response.ok) {
          throw new Error(t('exams.errorTitle'));
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = utils.sheet_to_json<ExamData>(worksheet);
        
        setExams(data);
      } catch (err) {
        console.error('Excel dosyası okuma hatası:', err);
        setError(t('exams.errorMessage'));
      } finally {
        setIsLoading(false);
      }
    }

    loadExamData();
  }, [t]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredExams = exams
    .filter(exam => exam['Ders Kodu'] !== 'YEDEK')
    .filter(exam => 
      Object.entries(exam)
        .filter(([key]) => key !== 'Gözetmen')
        .some(([_, value]) => 
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

  const totalPages = Math.ceil(filteredExams.length / ITEMS_PER_PAGE);
  const paginatedExams = filteredExams.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      let middleStart = Math.max(2, currentPage - 1);
      let middleEnd = Math.min(totalPages - 1, currentPage + 1);
      
      if (middleEnd - middleStart < 2 && totalPages > 4) {
        if (currentPage <= 3) {
          middleEnd = 4;
        } else if (currentPage >= totalPages - 2) {
          middleStart = totalPages - 3;
        }
      }
      
      if (middleStart > 2) {
        pageNumbers.push('...');
      }
      
      for (let i = middleStart; i <= middleEnd; i++) {
        pageNumbers.push(i);
      }
      
      if (middleEnd < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <nav className="flex mb-6 items-center text-sm">
        <Link href="/">
          <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <Home size={16} className="mr-1" />
            <span>{t('nav.home')}</span>
          </div>
        </Link>
        <ChevronRight size={16} className="mx-2 text-gray-500" />
        <div className="flex items-center font-medium text-gray-700">
          <Calendar size={16} className="mr-1" />
          <span>{t('exams.title')}</span>
        </div>
      </nav>

      
      <div className="relative max-w-md mx-auto mb-8">
        
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={t('exams.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">{t('exams.loading')}</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 border border-red-300 rounded-lg bg-red-50 shadow-sm">
          {error}
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('exams.headers.examDate')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('exams.headers.courseCode')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('exams.headers.startTime')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('exams.headers.endTime')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('exams.headers.instructor')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('exams.headers.examLocation')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedExams.length > 0 ? (
                  paginatedExams.map((exam, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {exam['Sınav Tarihi']}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {exam['Ders Kodu']}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {exam['Başlangıç Saati']}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {exam['Bitiş Saati']}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {exam['Öğretim Elemanı']}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {exam['Sınav Yeri']}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500 bg-gray-50">
                      {searchTerm ? t('exams.noResults') : t('exams.emptyList')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                {t('exams.totalExams', { count: filteredExams.length })}
              </div>
              
              {filteredExams.length > 0 && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentPage(curr => Math.max(1, curr - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                      currentPage === 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && setCurrentPage(page)}
                      className={`px-3 py-1 rounded-md ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : page === '...'
                          ? 'text-gray-500 cursor-default'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(curr => Math.min(totalPages, curr + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${
                      currentPage === totalPages 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ChevronRightIcon size={16} />
                  </button>
                </div>
              )}
              
              <div className="sm:ml-4 mt-4 sm:mt-0">
                <Link href="/">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <Home size={16} className="mr-1" />
                    {t('backToHome')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
