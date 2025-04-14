'use client';

import { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import { Search } from 'lucide-react';

interface ExamData {
  'Sınav Tarihi': string;
  'Ders Kodu': string;
  'Başlangıç Saati': string;
  'Bitiş Saati': string;
  'Öğretim Elemanı': string;
  'Sınav Yeri': string;
  'Gözetmen': string;
}

export default function ExamsPage() {
  const [exams, setExams] = useState<ExamData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadExamData() {
      try {
        const response = await fetch('/documents/exam_list.xlsx');
        
        if (!response.ok) {
          throw new Error('Excel dosyası bulunamadı');
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = utils.sheet_to_json<ExamData>(worksheet);
        
        setExams(data);
      } catch (err) {
        console.error('Excel dosyası okuma hatası:', err);
        setError('Sınav verileri yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    }

    loadExamData();
  }, []);

  const filteredExams = exams.filter(exam => 
    Object.values(exam).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Sınav Programı</h1>
      
      <div className="relative max-w-md mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Ders kodu, sınav yeri veya gözetmen ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 border border-red-300 rounded bg-red-50">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Sınav Tarihi
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Ders Kodu
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Başlangıç Saati
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Bitiş Saati
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Öğretim Elemanı
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Sınav Yeri
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Gözetmen
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        {exam['Sınav Tarihi']}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm font-medium">
                        {exam['Ders Kodu']}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        {exam['Başlangıç Saati']}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        {exam['Bitiş Saati']}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        {exam['Öğretim Elemanı']}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        {exam['Sınav Yeri']}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        {exam['Gözetmen']}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-sm text-gray-500">
                      {searchTerm ? 'Arama sonucu bulunamadı' : 'Sınav listesi boş'}
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={7} className="px-5 py-3 border-t border-gray-200 text-right text-xs text-gray-500">
                    Toplam {filteredExams.length} Sınav
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
