import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import StarterKit from '@tiptap/starter-kit'
import './tiptap.css'
import { Bold, CodeXml, Italic, List, ListOrdered, Minus, Pilcrow, Redo2, Strikethrough, TextQuote, UnderlineIcon, Undo2, Highlighter, ChevronDown, Baseline } from 'lucide-react'
import { highlightColors, textColors, fontFamilies } from './editoroptions'

const Tiptap = ({ value, setValue }) => {
    const [showHighlightColors, setShowHighlightColors] = useState(false)
    const [showTextColors, setShowTextColors] = useState(false)
    const editor = useEditor({
        extensions: [StarterKit, Highlight.configure({ multicolor: true }), TextStyle, Color, FontFamily],
        content: value || '',
        shouldRerenderOnTransaction: true,
        onUpdate: ({ editor }) => {
            setValue(editor.getHTML());
        },
    })

    if (!editor) {
        return null
    }

    return (
        <div className="w-full">
            <div className="flex justify-start items-center gap-1 p-2 mb-4 text-text flex-wrap border border-neutral-300 rounded-xl">
                {/* Bold */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`editor-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
                >
                    <Bold size={16} />
                </button>

                {/* Underline */}
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleUnderline().run()}
                    className={`editor-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
                >
                    <UnderlineIcon size={16} />
                </button>

                {/* Italic */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`editor-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
                >
                    <Italic size={16} />
                </button>

                {/* Strike */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`editor-btn ${editor.isActive('strike') ? 'is-active' : ''}`}
                >
                    <Strikethrough size={16} />
                </button>

                {/* Code */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={`editor-btn ${editor.isActive('code') ? 'is-active' : ''}`}
                >
                    <CodeXml size={16} />
                </button>

                {/* Highlighter */}
                <div className="relative flex items-center">
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowHighlightColors(prev => !prev)}
                        className={`editor-btn flex items-center gap-1 ${editor.isActive('highlight') ? 'is-active' : ''
                            }`}
                    >
                        <Highlighter size={16} />
                        <ChevronDown size={13} />
                    </button>

                    {showHighlightColors && (
                        <div className="absolute top-full left-0 mt-1 z-50 w-52 p-2 bg-white border border-neutral-200 rounded-md shadow-lg">

                            <p className="text-xs text-description px-1 mb-2">
                                Text Highlight Color
                            </p>

                            <div className="grid grid-cols-8 gap-1">
                                {highlightColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        aria-label={`Highlight ${color}`}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            editor
                                                .chain()
                                                .focus()
                                                .setHighlight({ color })
                                                .run()

                                            setShowHighlightColors(false)
                                        }}
                                        className="w-5 h-5 rounded-sm border border-neutral-300 hover:scale-110 transition-transform cursor-pointer"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    editor.chain().focus().unsetHighlight().run()
                                    setShowHighlightColors(false)
                                }}
                                className="w-full mt-2 pt-2 border-t border-neutral-200 text-xs text-left text-description hover:text-heading"
                            >
                                No Color
                            </button>
                        </div>
                    )}
                </div>

                {/* Text Colors */}
                <div className="relative">
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowTextColors(prev => !prev)}
                        className="editor-btn"
                    >
                        <Baseline size={16} />
                        <ChevronDown size={13} />
                    </button>

                    {showTextColors && (
                        <div className="absolute top-full w-42 left-0 mt-1 z-50 bg-white border border-neutral-200 rounded-lg shadow-lg p-2">
                            <div className="grid grid-cols-7 gap-1">
                                {textColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            editor
                                                .chain()
                                                .focus()
                                                .setColor(color)
                                                .run()

                                            setShowTextColors(false)
                                        }}
                                        className="w-6 h-6 rounded-sm border border-neutral-300 cursor-pointer hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    editor.chain().focus().unsetColor().run()
                                    setShowTextColors(false)
                                }}
                                className="w-full mt-2 pt-2 border-t text-xs text-left text-description"
                            >
                                Automatic
                            </button>
                        </div>
                    )}
                </div>

                {/* Paragraph */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`editor-btn ${editor.isActive('paragraph') ? 'is-active' : ''}`}
                >
                    <Pilcrow size={16} />
                </button>

                {/* Headings Dropdown */}
                <select className="select-style"
                    value={
                        editor.isActive('heading', { level: 1 })
                            ? '1'
                            : editor.isActive('heading', { level: 2 })
                                ? '2'
                                : editor.isActive('heading', { level: 3 })
                                    ? '3'
                                    : editor.isActive('heading', { level: 4 })
                                        ? '4'
                                        : editor.isActive('heading', { level: 5 })
                                            ? '5'
                                            : 'paragraph'
                    }
                    onChange={(e) => {
                        const value = e.target.value

                        if (value === 'paragraph') {
                            editor.chain().focus().setParagraph().run()
                        } else {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: Number(value) })
                                .run()
                        }
                    }}
                >
                    <option value="paragraph">Paragraph</option>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                    <option value="4">Heading 4</option>
                    <option value="5">Heading 5</option>
                </select>

                {/* Font Family */}
                <select
                    className="select-style"
                    defaultValue="default"
                    onChange={(e) => {
                        const font = e.target.value

                        if (font === "default") {
                            editor
                                .chain()
                                .focus()
                                .unsetFontFamily()
                                .run()
                        } else {
                            editor
                                .chain()
                                .focus()
                                .setFontFamily(font)
                                .run()
                        }
                    }}
                >
                    {fontFamilies.map((font) => (
                        <option
                            key={font.value}
                            value={font.value}
                            style={{
                                fontFamily:
                                    font.value === "default"
                                        ? "inherit"
                                        : font.value,
                            }}
                        >
                            {font.name}
                        </option>
                    ))}
                </select>

                {/* Bullet list */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`editor-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
                >
                    <List size={16} />
                </button>

                {/* Ordered list */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`editor-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
                >
                    <ListOrdered size={16} />
                </button>

                {/* Blockquote */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`editor-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
                >
                    <TextQuote size={16} />
                </button>

                {/* Horizontal rule */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="editor-btn"
                >
                    <Minus size={16} />
                </button>

                {/* Undo */}
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    className="editor-btn"
                    onClick={() => {
                        editor.chain().focus().undo().run()
                    }}
                >
                    <Undo2 size={16} />
                </button>

                {/* Redo */}
                <button
                    type="button"
                    className="editor-btn"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                        editor.chain().focus().redo().run()
                    }}
                >
                    <Redo2 size={16} />
                </button>
            </div>

            <div className="w-full border border-neutral-300 rounded-xl outline-none p-2">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Tiptap