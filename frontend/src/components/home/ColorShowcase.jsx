const colors = [
    { name: 'Lavender', hex: '#F3E8FF' },
    { name: 'Blush', hex: '#fce7f3' },
    { name: 'Sky', hex: '#e0f2fe' },
    { name: 'Peach', hex: '#ffedd5' },
    { name: 'Sage', hex: '#dcfce7' },
]

function ColorShowcase() {
    return (
        <section className="max-w-7xl mx-auto px-4 tablet:px-8 pb-16 laptop:pb-24">
            <div className="rounded-3xl border border-border bg-white px-6 py-10 laptop:px-12 laptop:py-12 flex flex-col laptop:flex-row items-center laptop:items-start gap-8 laptop:gap-16">
                <div className="max-w-xs shrink-0">
                    <h3 className="font-playfair font-semibold text-[1.5rem] text-heading leading-tight">
                        A color for every kind of note.
                    </h3>
                    <p className="text-[14px] text-description font-poppins mt-2.5 leading-relaxed">
                        Color-code your notes to tell them apart at a glance, without
                        turning your workspace into a rainbow.
                    </p>
                </div>

                <div className="flex flex-wrap gap-5 laptop:gap-6">
                    {colors.map((color) => (
                        <div key={color.name} className="flex flex-col items-center gap-2">
                            <div
                                className="w-14 h-14 mobile:w-16 mobile:h-16 rounded-2xl border border-black/5 shadow-sm"
                                style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-[12.5px] text-description font-poppins">{color.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ColorShowcase