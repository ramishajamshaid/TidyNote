import { LayoutGrid, Star, CircleCheckBig, Trash, Lock, Zap } from 'lucide-react'

const features = [
    {
        icon: LayoutGrid,
        title: 'Notes',
        desc: 'Write, edit, and organize notes in a clean workspace built for focus.',
        tint: 'bg-purple-light text-purple-dark',
    },
    {
        icon: Star,
        title: 'Favourites',
        desc: 'Star what matters and keep it one click away from everything else.',
        tint: 'bg-pink-light text-pink-dark',
    },
    {
        icon: CircleCheckBig,
        title: 'Todos',
        desc: 'Turn a note into a task list and check things off as you go.',
        tint: 'bg-blue-light text-blue-dark',
    },
    {
        icon: Trash,
        title: 'Trash',
        desc: 'Deleted notes wait safely in trash, separate from your workspace.',
        tint: 'bg-orange-light text-orange-dark',
    },
    {
        icon: Lock,
        title: 'Personal workspace',
        desc: 'Every note belongs to your account alone — private by default.',
        tint: 'bg-green-light text-green-dark',
    },
    {
        icon: Zap,
        title: 'Simple & focused',
        desc: 'No clutter, no extra steps — just the tools you actually reach for.',
        tint: 'bg-yellow-light text-yellow-dark',
    },
]

function Features() {
    return (
        <section id="features" className="max-w-7xl mx-auto px-4 tablet:px-8 py-16 laptop:py-24 scroll-mt-20">
            <div className="max-w-xl mb-12 laptop:mb-16">
                <h2 className="font-playfair font-semibold text-[1.9rem] laptop:text-[2.3rem] text-heading leading-tight">
                    Built around how you actually think.
                </h2>
                <p className="text-[15.5px] text-description font-poppins mt-3 leading-relaxed">
                    Every part of TidyNote maps to a real step in getting a thought out of
                    your head and into something useful.
                </p>
            </div>

            <div className="grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-3 gap-5">
                {features.map(({ icon: Icon, title, desc, tint }) => (
                    <div
                        key={title}
                        className="group p-6 rounded-2xl border border-border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_-18px_rgba(24,24,27,0.18)]"
                    >
                        <span className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${tint}`}>
                            <Icon size={20} />
                        </span>
                        <p className="text-[16px] font-semibold text-heading font-poppins">{title}</p>
                        <p className="text-[14px] text-description font-poppins leading-relaxed mt-1.5">{desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features