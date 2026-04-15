import React from "react";
import { useParams } from "react-router";
import useBooks from "../../hooks/useBooks";

const BookDetails = () => {
    const { bookId } = useParams();
    const { books, loading, error } = useBooks();

    const book = books.find(b => b.bookId === parseInt(bookId));

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-2xl">Loading book details...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">Error: {error}</div>;
    }

    if (!book) {
        return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Book not found 😔</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Side - Book Cover (like Figma) */}
                <div className="lg:col-span-5 flex justify-center">
                    <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full">
                        <img
                            src={book.image}
                            alt={book.bookName}
                            className="w-full h-auto object-contain rounded-2xl shadow-lg"
                        />
                    </div>
                </div>

                {/* Right Side - Book Information */}
                <div className="lg:col-span-7 space-y-8">
                    
                    {/* Title & Author */}
                    <div>
                        <h1 className="text-5xl font-bold leading-tight text-gray-900">
                            {book.bookName}
                        </h1>
                        <p className="text-2xl text-gray-600 mt-3">
                            By : {book.author}
                        </p>
                    </div>

                    {/* Category */}
                    <div className="text-xl font-medium text-gray-700 border-b pb-6">
                        {book.category}
                    </div>

                    {/* Review */}
                    <div>
                        <h3 className="font-semibold text-xl mb-4">Review</h3>
                        <p className="text-gray-600 leading-relaxed text-[17px]">
                            {book.review}
                        </p>
                    </div>

                    {/* Tags */}
                    <div>
                        <h3 className="font-semibold text-xl mb-4">Tag</h3>
                        <div className="flex flex-wrap gap-3">
                            {book.tags?.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-5 py-2 bg-green-100 text-green-700 rounded-full text-base font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 text-base pt-4">
                        <div>
                            <p className="text-gray-500 mb-1">Number of Pages:</p>
                            <p className="font-semibold text-lg">{book.totalPages}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Publisher:</p>
                            <p className="font-semibold text-lg">{book.publisher}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Year of Publishing:</p>
                            <p className="font-semibold text-lg">{book.yearOfPublishing}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Rating:</p>
                            <p className="font-semibold text-lg flex items-center gap-2">
                                {book.rating} 
                                <span className="text-2xl">⭐</span>
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-8">
                        <button className="flex-1 border-2 border-gray-900 text-gray-900 font-semibold py-4 rounded-2xl hover:bg-gray-100 transition text-lg">
                            Read
                        </button>
                        <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 rounded-2xl transition text-lg">
                            Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;