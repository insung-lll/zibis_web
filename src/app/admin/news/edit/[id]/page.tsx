'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import TiptapEditor from '@/components/TiptapEditor';
import Link from 'next/link';

export default function AdminNewsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchNews();
    }
  }, [isNew, resolvedParams.id]);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', resolvedParams.id)
      .single();
    
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setThumbnailUrl(data.thumbnail_url || '');
      setIsPublished(data.is_published);
    }
    setIsLoading(false);
  };

  const uploadThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumbnail(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `thumb-${Math.random()}.${fileExt}`;
      const filePath = `thumbnails/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('news-images').getPublicUrl(filePath);
      setThumbnailUrl(data.publicUrl);
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      alert('Failed to upload thumbnail.');
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    
    setIsSaving(true);
    
    const payload = {
      title,
      content,
      thumbnail_url: thumbnailUrl,
      is_published: isPublished,
    };

    let error;
    if (isNew) {
      const res = await supabase.from('news').insert([payload]);
      error = res.error;
    } else {
      const res = await supabase.from('news').update(payload).eq('id', resolvedParams.id);
      error = res.error;
    }

    setIsSaving(false);

    if (error) {
      console.error('Save error:', error);
      alert('Failed to save.');
    } else {
      router.push('/admin/news');
      router.refresh();
    }
  };

  if (isLoading) {
    return <div className="p-8 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#111111]">{isNew ? 'Write New Post' : 'Edit Post'}</h1>
        <div className="flex space-x-3">
          <Link 
            href="/admin/news" 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-white bg-[#111111] rounded-md hover:bg-black disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
          {thumbnailUrl && (
            <div className="mb-3">
              <img src={thumbnailUrl} alt="Thumbnail" className="h-32 object-cover rounded-md border border-gray-200" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={uploadThumbnail}
            disabled={isUploadingThumbnail}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
          {isUploadingThumbnail && <span className="text-sm text-gray-500 ml-2">Uploading...</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        <div className="flex items-center">
          <input
            id="isPublished"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
          />
          <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
            Publish immediately
          </label>
        </div>
      </div>
    </div>
  );
}
