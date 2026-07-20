'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_size: number;
  created_at: string;
};

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const supabase = createClient();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setResources(data);
    setIsLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    
    if (!file || !newTitle.trim()) {
      alert('Title and File are required.');
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload file to Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `files/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('downloadables')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('downloadables').getPublicUrl(filePath);

      // 2. Insert into DB
      const { error: dbError } = await supabase.from('resources').insert([{
        title: newTitle,
        description: newDescription,
        file_url: urlData.publicUrl,
        file_size: file.size,
      }]);

      if (dbError) throw dbError;

      // Reset form
      setNewTitle('');
      setNewDescription('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      fetchResources();
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    
    try {
      // DB Delete
      await supabase.from('resources').delete().eq('id', id);
      
      // Attempt Storage Delete (optional cleanup)
      try {
        const urlParts = fileUrl.split('/downloadables/');
        if (urlParts.length > 1) {
          const path = urlParts[1];
          await supabase.storage.from('downloadables').remove([path]);
        }
      } catch (e) {
        console.warn('Storage cleanup failed', e);
      }
      
      fetchResources();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete resource.');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]">Resources Management</h1>
        <p className="text-sm text-gray-500 mt-2">Upload and manage downloadable files.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upload New Resource</h2>
        <form onSubmit={handleUpload} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
          <div className="col-span-1 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
              placeholder="e.g. 2024 Product Catalog"
            />
          </div>
          <div className="col-span-1 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
              placeholder="Brief description..."
            />
          </div>
          <div className="col-span-1 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">File (PDF, ZIP, etc)</label>
            <input
              type="file"
              required
              ref={fileInputRef}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>
          <div className="col-span-1 lg:col-span-1">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#111111] hover:bg-black disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading resources...</div>
        ) : resources.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No resources found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resources.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatBytes(item.file_size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                    <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">Download</a>
                    <button onClick={() => handleDelete(item.id, item.file_url)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
