import { useState } from 'react'
import {
    HelpCircle,
    MessageCircle,
    Bug,
    Lightbulb,
    ChevronDown,
    Mail,
    Send,
    Search,
    CircleHelp
} from 'lucide-react'
import '../App.css'
import PageHeader from '../components/PageHeader.jsx'

function Support() {
    const [activeFAQ, setActiveFAQ] = useState(null)
    const [category, setCategory] = useState('General Question')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [feedbackType, setFeedbackType] = useState('')

    const faqs = [
        {
            question: 'How do I create a new note?',
            answer: 'Navigate to the Add Note page, enter your title and description, and save your note. You can access it later from All Notes.'
        },
        {
            question: 'Where can I find my favourite notes?',
            answer: 'Open the Favourites section from the sidebar to view all the notes you have marked as favourites.'
        },
        {
            question: 'Can I restore a deleted note?',
            answer: 'Yes! Open the Trash section, find the note you want to restore, and use the restore option if it is available.'
        },
        {
            question: 'How do I edit an existing note?',
            answer: 'Open a note from your dashboard to view its details. Use the edit option to update its title or description.'
        },
        {
            question: 'What happens when I delete a note?',
            answer: 'Deleted notes move to the Trash section, where you can manage them separately from your active notes.'
        }
    ]

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        // Dummy form: no data is sent to a server.
        alert('This is a demo form. Your message has not been sent.')
    }

    const handleFeedback = (type) => {
        setFeedbackType(type)
    }

    const cardClass = 'w-full rounded-2xl border border-purple-100 bg-white p-5 mobile:p-6 shadow-sm'
    const inputClass = 'w-full rounded-xl border border-purple-100 bg-purple-50/30 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-100'

    return (
        <div className="flex w-full flex-col items-center gap-6 px-4 py-2 mt-12 mb-18 mobile:px-6 tablet:mt-0 tablet:mb-0">
            <PageHeader
                title="Support & Help"
                description="Find answers, share feedback, and get help with TidyNote."
                showLayout={false}
            />

            <div className="flex w-full flex-col gap-6">

                {/* Welcome banner */}
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-100 via-pink-50 to-purple-50 p-6 mobile:p-8">
                    <div className="relative z-10 max-w-xl">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-sm">
                            <HelpCircle size={25} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mobile:text-2xl">
                            How can we help you?
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Find answers to common questions or tell us how we can make your note-taking experience better.
                        </p>
                    </div>
                    <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-purple-200/40" />
                    <div className="pointer-events-none absolute -bottom-12 right-20 h-32 w-32 rounded-full bg-pink-200/40" />
                </div>

                {/* Quick links */}
                <div className="grid grid-cols-1 gap-4 mobile:grid-cols-3">
                    <a href="#faqs" className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-white p-4 transition hover:border-purple-300 hover:shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <CircleHelp size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">FAQs</p>
                            <p className="mt-1 text-xs text-gray-500">Find quick answers</p>
                        </div>
                    </a>

                    <a href="#contact" className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-white p-4 transition hover:border-purple-300 hover:shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                            <MessageCircle size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">Contact Us</p>
                            <p className="mt-1 text-xs text-gray-500">Tell us your issue</p>
                        </div>
                    </a>

                    <a href="#feedback" className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-white p-4 transition hover:border-purple-300 hover:shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <Lightbulb size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">Feedback</p>
                            <p className="mt-1 text-xs text-gray-500">Share your ideas</p>
                        </div>
                    </a>
                </div>

                {/* FAQs */}
                <section id="faqs" className={cardClass}>
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <HelpCircle size={20} />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800">Frequently Asked Questions</h2>
                            <p className="mt-1 text-xs text-gray-500">Answers to common questions</p>
                        </div>
                    </div>

                    <div className="relative mb-5">
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search questions..."
                            className={`${inputClass} pl-10`}
                        />
                    </div>

                    <div className="flex flex-col divide-y divide-purple-50">
                        {filteredFAQs.map((faq, index) => (
                            <div key={faq.question} className="py-1">
                                <button
                                    type="button"
                                    onClick={() => setActiveFAQ(activeFAQ === faq.question ? null : faq.question)}
                                    aria-expanded={activeFAQ === faq.question}
                                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                                >
                                    <span className="text-sm font-medium text-gray-700">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={`shrink-0 text-purple-500 transition-transform ${activeFAQ === faq.question ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {activeFAQ === faq.question && (
                                    <p className="pb-4 pr-6 text-sm leading-6 text-gray-500">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}

                        {filteredFAQs.length === 0 && (
                            <p className="py-6 text-center text-sm text-gray-500">
                                No matching questions found. Try another search.
                            </p>
                        )}
                    </div>
                </section>

                {/* Contact form */}
                <section id="contact" className={cardClass}>
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800">Contact Support</h2>
                            <p className="mt-1 text-xs text-gray-500">Describe your question or issue</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="support-category" className="mb-2 block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                id="support-category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className={inputClass}
                            >
                                <option>General Question</option>
                                <option>Notes & Editing</option>
                                <option>Account & Login</option>
                                <option>Technical Issue</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="support-subject" className="mb-2 block text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <input
                                id="support-subject"
                                type="text"
                                required
                                maxLength={100}
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                placeholder="What do you need help with?"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="support-message" className="mb-2 block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="support-message"
                                required
                                rows={4}
                                maxLength={1000}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Describe your question or issue..."
                                className={`${inputClass} resize-y`}
                            />
                            <p className="mt-1 text-right text-xs text-gray-400">
                                {message.length}/1000
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-700 mobile:w-fit"
                        >
                            <Send size={16} />
                            Submit Message
                        </button>
                    </form>
                </section>

                {/* Feedback */}
                <section id="feedback" className={cardClass}>
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <Lightbulb size={20} />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800">Help Us Improve</h2>
                            <p className="mt-1 text-xs text-gray-500">What would you like to share?</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mobile:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => handleFeedback('bug')}
                            className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${feedbackType === 'bug' ? 'border-purple-400 bg-purple-50' : 'border-gray-100 hover:border-purple-200 hover:bg-purple-50/40'}`}
                        >
                            <Bug size={20} className="mt-0.5 shrink-0 text-purple-600" />
                            <div>
                                <p className="text-sm font-medium text-gray-800">Report a Bug</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">Something isn't working as expected.</p>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleFeedback('idea')}
                            className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${feedbackType === 'idea' ? 'border-purple-400 bg-purple-50' : 'border-gray-100 hover:border-purple-200 hover:bg-purple-50/40'}`}
                        >
                            <Lightbulb size={20} className="mt-0.5 shrink-0 text-amber-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-800">Suggest a Feature</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">Share an idea for making TidyNote better.</p>
                            </div>
                        </button>
                    </div>

                    {feedbackType && (
                        <p className="mt-4 rounded-xl bg-purple-50 p-3 text-sm text-purple-700">
                            {feedbackType === 'bug'
                                ? 'Bug report selected. You can describe the issue in the contact form above.'
                                : 'Feature suggestion selected. Share your idea in the contact form above.'}
                        </p>
                    )}
                </section>

                {/* Footer */}
                <div className="flex flex-col items-center gap-2 py-3 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                        <MessageCircle size={19} />
                    </div>
                    <p className="text-sm font-medium text-gray-700">We're here to help</p>
                    <p className="text-xs text-gray-400">
                        TidyNote · Your thoughts, beautifully organized.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Support