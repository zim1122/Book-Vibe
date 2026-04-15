import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useBooks from "../../hooks/useBooks";

const BookDetails = () => {
    const { bookId } = useParams();
    const { books, loading, error } = useBooks();

    const [readBooks, setReadBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedRead = JSON.parse(localStorage.getItem("readBooks") || "[]");
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setReadBooks(savedRead);
        setWishlist(savedWishlist);
    }, []);

    const book = books.find(b => b.bookId === parseInt(bookId));

    const isRead = readBooks.some(b => b.bookId === parseInt(bookId));
    const isInWishlist = wishlist.some(b => b.bookId === parseInt(bookId));

    const handleMarkAsRead = () => {
        if (isRead) return;

        const updatedRead = [...readBooks, book];
        setReadBooks(updatedRead);
        localStorage.setItem("readBooks", JSON.stringify(updatedRead));

        toast.success("✅ Book marked as Read successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleAddToWishlist = () => {
        if (isInWishlist) return;

        const updatedWishlist = [...wishlist, book];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        toast.success("❤️ Book added to Wishlist successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

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

                {/* Book Cover */}
                <div className="lg:col-span-5 flex justify-center">
                    <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full">
                        <img
                            src={book.image}
                            alt={book.bookName}
                            className="w-full h-auto object-contain rounded-2xl shadow-lg"
                        />
                    </div>
                </div>

                {/* Book Details */}
                <div className="lg:col-span-7 space-y-8">
                    <div>
                        <h1 className="text-5xl font-bold leading-tight">{book.bookName}</h1>
                        <p className="text-2xl text-gray-600 mt-3">By : {book.author}</p>
                    </div>

                    <div className="text-xl font-medium text-gray-700 border-b pb-6">
                        {book.category}
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl mb-4">Review</h3>
                        <p className="text-gray-600 leading-relaxed text-[17px]">
                            {book.review}
                        </p>
                    </div>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 text-base">
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
                                {book.rating} <span className="text-2xl">⭐</span>
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-8">
                        <button
                            onClick={handleMarkAsRead}
                            disabled={isRead}
                            className={`flex-1 font-semibold py-4 rounded-2xl text-lg transition-all ${isRead
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "border-2 border-gray-900 text-gray-900 hover:bg-gray-100 hover:shadow-md"}`}
                        >
                            {isRead ? "Already Marked as Read" : "Mark As Read"}
                        </button>

                        <button
                            onClick={handleAddToWishlist}
                            disabled={isInWishlist}
                            className={`flex-1 font-semibold py-4 rounded-2xl text-lg transition-all ${isInWishlist
                                ? "bg-teal-300 text-white cursor-not-allowed"
                                : "bg-teal-500 hover:bg-teal-600 text-white hover:shadow-md"}`}
                        >
                            {isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default BookDetails;