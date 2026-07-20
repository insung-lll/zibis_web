'use client';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#111111] mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-2">ZIBIS News</h2>
          <p className="text-sm text-gray-500 mb-4">Manage your studio news, articles, and announcements.</p>
          <a href="/admin/news" className="text-sm font-medium text-[#036CC5] hover:underline">
            Go to News &rarr;
          </a>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Resources</h2>
          <p className="text-sm text-gray-500 mb-4">Upload downloadable materials like catalogs and guides.</p>
          <a href="/admin/resources" className="text-sm font-medium text-[#036CC5] hover:underline">
            Go to Resources &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
