import React from 'react';

const booksData = [
    {
        name: "The Great Gatsby",
        value: 192,
        color: "#3b82f6",     // Blue
    },
    {
        name: "To Kill a Mockingbird",
        value: 281,
        color: "#14b8a5",     // Teal/Green
    },
    {
        name: "1984",
        value: 328,
        color: "#fbbf24",     // Yellow/Orange
    },
    {
        name: "The Alchemist",
        value: 177,
        color: "#f97316",     // Orange
    },
    {
        name: "Pride and Prejudice",
        value: 279,
        color: "#ef4444",     // Red
    },
];

const BookPopularityChart = () => {
    const maxValue = Math.max(...booksData.map(book => book.value));

    return (
        <div className="bg-white rounded-3xl p-10 shadow-sm max-w-5xl mx-auto">
            <div className="relative h-[420px] flex items-end justify-between px-4">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-right pr-6 text-sm text-gray-400">
                    <div>340</div>
                    <div>255</div>
                    <div>170</div>
                    <div>85</div>
                    <div>00</div>
                </div>

                {/* Spikes */}
                <div className="flex-1 flex justify-around items-end gap-12 relative h-full">
                    {booksData.map((book, index) => {
                        const heightPercentage = (book.value / maxValue) * 100;

                        return (
                            <div key={index} className="flex flex-col items-center relative w-20">
                                {/* Value Label */}
                                <div 
                                    className="absolute -top-8 font-semibold text-lg"
                                    style={{ color: book.color }}
                                >
                                    {book.value}
                                </div>

                                {/* Spike */}
                                <div 
                                    className="w-20 rounded-t-3xl transition-all duration-700 hover:scale-105"
                                    style={{
                                        height: `${heightPercentage}%`,
                                        background: `linear-gradient(to top, ${book.color}, ${book.color}cc)`,
                                        minHeight: '40px',
                                    }}
                                />

                                {/* Book Name */}
                                <div className="text-center mt-6 text-sm font-medium text-gray-700 leading-tight w-28">
                                    {book.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Subtle grid lines */}
            <div className="relative -mt-80 h-[380px] pointer-events-none">
                {[85, 170, 255, 340].map((val, i) => (
                    <div 
                        key={i}
                        className="absolute w-full border-t border-dashed border-gray-200"
                        style={{ bottom: `${(val / 340) * 100}%` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BookPopularityChart;