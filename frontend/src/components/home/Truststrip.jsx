import { PencilSparkles, LayoutGrid, CircleCheckBig, Star } from 'lucide-react'

const items = [
    {
        icon: PencilSparkles,
        title: 'Capture',
        desc: 'Save ideas and thoughts the moment they show up.',
        tint: 'bg-purple-light text-purple-dark',
    },
    {
        icon: LayoutGrid,
        title: 'Organize',
        desc: 'Keep your notes structured and easy to find.',
        tint: 'bg-blue-light text-blue-dark',
    },
    {
        icon: CircleCheckBig,
        title: 'Stay focused',
        desc: 'Turn thoughts into todos you can act on.',
        tint: 'bg-green-light text-green-dark',
    },
    {
        icon: Star,
        title: 'Your space',
        desc: 'Favourites and notes, private to your account.',
        tint: 'bg-pink-light text-pink-dark',
    },
]

function TrustStrip() {
    return (
        <section className="max-w-7xl mx-auto px-4 tablet:px-8 pb-16 laptop:pb-24">
            <div className="grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-4 gap-5">
                {items.map(({ icon: Icon, title, desc, tint }) => (
                    <div
                        key={title}
                        className="flex items-start gap-3.5 p-5 rounded-2xl border border-border bg-white/60"
                    >
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tint}`}>
                            <Icon size={18} />
                        </span>
                        <div>
                            <p className="text-[15px] font-semibold text-heading font-poppins">{title}</p>
                            <p className="text-[13.5px] text-description font-poppins leading-snug mt-0.5">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TrustStrip