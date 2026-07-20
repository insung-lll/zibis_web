'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none focus:outline-none min-h-[300px] border border-gray-300 rounded-b-md p-4 bg-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `post-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('news-images').getPublicUrl(filePath);
      
      editor?.chain().focus().setImage({ src: data.publicUrl }).run();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await uploadImage(file);
      }
    };
    input.click();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="border border-b-0 border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 text-sm rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 text-sm rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 text-sm rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 text-sm rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-sm rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={handleImageClick}
          disabled={isUploading}
          className="px-3 py-1 text-sm rounded bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Insert Image'}
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
