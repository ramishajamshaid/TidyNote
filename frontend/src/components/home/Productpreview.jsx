import { Star } from 'lucide-react'

const steps = [
    { title: 'Write it down', desc: 'Get the thought out before it slips away.' },
    { title: 'Organize it', desc: 'Sort notes into a workspace that stays tidy.' },
    { title: 'Favourite what matters', desc: 'Star the notes you come back to often.' },
    { title: 'Turn ideas into todos', desc: 'Move from thinking to doing, in the same note.' },
]

const previewNotes = [
    { title: 'Project ideas', date: 'Sep 9', color: 'bg-purple-dark', favourite: false },
    { title: 'Things to learn', date: 'Sep 7', color: 'bg-blue', favourite: false },
    { title: 'Weekend plans', date: 'Sep 5', color: 'bg-pink', favourite: true },
    { title: 'Frontend roadmap', date: 'Sep 2', color: 'bg-orange', favourite: false },
]

function ProductPreview() {
    return (
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 tablet:px-8 py-16 laptop:py-24 scroll-mt-20">
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-14 laptop:gap-16 items-center">
                <div>
                    <h2 className="font-playfair font-semibold text-[1.9rem] laptop:text-[2.3rem] text-heading leading-tight max-w-md">
                        From thought to organized.
                    </h2>
                    <p className="text-[15.5px] text-description font-poppins mt-3 leading-relaxed max-w-sm">
                        A note in TidyNote can stay a note, or grow into something more —
                        without ever leaving the page.
                    </p>

                    <ol className="mt-9 flex flex-col gap-6">
                        {steps.map((step, index) => (
                            <li key={step.title} className="flex items-start gap-4">
                                <span className="w-8 h-8 rounded-full bg-purple-light text-purple-dark font-poppins font-semibold text-[13.5px] flex items-center justify-center shrink-0 mt-0.5">
                                    {index + 1}
                                </span>
                                <div>
                                    <p className="text-[15px] font-medium text-heading font-poppins">{step.title}</p>
                                    <p className="text-[13.5px] text-description font-poppins mt-0.5 leading-snug">{step.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="bg-white rounded-3xl border border-border shadow-[0_20px_50px_-20px_rgba(24,24,27,0.15)] p-5">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <p className="text-[13px] font-medium text-heading font-poppins">All notes</p>
                        <p className="text-[12px] text-muted font-poppins">{previewNotes.length} notes</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        {previewNotes.map((note) => (
                            <div
                                key={note.title}
                                className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl border border-border hover:bg-[#faf9fb] transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${note.color}`} />
                                    <p className="text-[14px] text-heading font-poppins truncate">{note.title}</p>
                                </div>
                                <div className="flex items-center gap-2.5 shrink-0">
                                    <span className="text-[12px] text-muted font-poppins">{note.date}</span>
                                    {note.favourite && (
                                        <Star size={14} className="fill-pink-dark text-pink-dark" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductPreview