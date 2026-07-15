'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { useRef } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Youtube.configure({
        controls: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[300px] p-4 border border-[var(--border-color)] rounded-b-md bg-white',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt('Ingresa la URL del video de YouTube:');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Falló la subida de imagen');
      
      const data = await response.json();
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      console.error(error);
      alert('Hubo un error al subir la imagen.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="tiptap-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="toolbar" style={{ display: 'flex', gap: '8px', padding: '8px', border: '1px solid var(--border-color)', borderBottom: 'none', borderRadius: '8px 8px 0 0', backgroundColor: '#f9fafb', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{ padding: '6px 12px', borderRadius: '4px', background: editor.isActive('bold') ? '#e5e7eb' : 'transparent', border: '1px solid transparent' }}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{ padding: '6px 12px', borderRadius: '4px', background: editor.isActive('italic') ? '#e5e7eb' : 'transparent', border: '1px solid transparent' }}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={{ padding: '6px 12px', borderRadius: '4px', background: editor.isActive('heading', { level: 2 }) ? '#e5e7eb' : 'transparent', border: '1px solid transparent', fontWeight: 'bold' }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={{ padding: '6px 12px', borderRadius: '4px', background: editor.isActive('heading', { level: 3 }) ? '#e5e7eb' : 'transparent', border: '1px solid transparent', fontWeight: 'bold' }}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={{ padding: '6px 12px', borderRadius: '4px', background: editor.isActive('blockquote') ? '#e5e7eb' : 'transparent', border: '1px solid transparent' }}
        >
          ❞ Cita
        </button>
        
        <div style={{ width: '1px', backgroundColor: 'var(--border-color)', margin: '0 4px' }}></div>
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{ padding: '6px 12px', borderRadius: '4px', background: 'transparent', border: '1px solid transparent' }}
        >
          🖼️ Imagen
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handleImageUpload} 
        />
        
        <button
          type="button"
          onClick={addYoutubeVideo}
          style={{ padding: '6px 12px', borderRadius: '4px', background: 'transparent', border: '1px solid transparent' }}
        >
          📺 YouTube
        </button>
      </div>
      <EditorContent editor={editor} style={{ flexGrow: 1 }} />
    </div>
  );
}
