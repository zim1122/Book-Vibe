import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Books = () => {
    const [activeTab, setActiveTab] = useState("read"); // "read" or "wishlist"
    const [readBooks, setReadBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // Load data from localStorage
    useEffect(() => {
        const savedRead = JSON.parse(localStorage.getItem("readBooks") || "[]");
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        
        setReadBooks(savedRead);
        setWishlist(savedWishlist);
    }, []);

    const currentBooks = activeTab === "read" ? readBooks : wishlist;

    const handleRemove = (bookId) => {
        if (activeTab === "read") {
            const updated = readBooks.filter(book => book.bookId !== bookId);
            setReadBooks(updated);
            localStorage.setItem("readBooks", JSON.stringify(updated));
            toast.info("Book removed from Read Books");
        } else {
            const updated = wishlist.filter(book => book.bookId !== bookId);
            setWishlist(updated);
            localStorage.setItem("wishlist", JSON.stringify(updated));
            toast.info("Book removed from Wishlist");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-10">
                <button
                    onClick={() => setActiveTab("read")}
                    className={`px-10 py-3 rounded-3xl font-semibold text-lg transition-all ${
                        activeTab === "read"
                            ? "bg-black text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Read Books
                </button>

                <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`px-10 py-3 rounded-3xl font-semibold text-lg transition-all ${
                        activeTab === "wishlist"
                            ? "bg-black text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Wishlist Books
                </button>
            </div>

            {/* Sort By Button */}
            <div className="flex justify-end mb-8">
                <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-3xl flex items-center gap-2 font-medium transition">
                    Sort By 
                    <span>▼</span>
                </button>
            </div>

            {/* Books List */}
            {currentBooks.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-3xl text-gray-400 font-medium">
                        {activeTab === "read" 
                            ? "No books marked as read yet" 
                            : "Your wishlist is empty"}
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {currentBooks.map((book) => (
                        <div
                            key={book.bookId}
                            className="bg-white rounded-3xl p-6 flex gap-8 shadow-sm hover:shadow-md transition-all border border-gray-100"
                        >
                            {/* Book Cover */}
                            <div className="w-32 flex-shrink-0">
                                <img
                                    src={book.image}
                                    alt={book.bookName}
                                    className="w-full h-44 object-contain rounded-2xl shadow-md"
                                />
                            </div>

                            {/* Book Information */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                    {book.bookName}
                                </h2>
                                <p className="text-gray-600">By : {book.author}</p>

                                {/* Tags */}
                                <div className="flex gap-2 mt-4">
                                    {book.tags?.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Meta Details */}
                                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600">
                                    <div>Publisher: <span className="font-medium">{book.publisher}</span></div>
                                    <div>Page: <span className="font-medium">{book.totalPages}</span></div>
                                    <div>Year: <span className="font-medium">{book.yearOfPublishing}</span></div>
                                    <div>Rating: <span className="font-medium">{book.rating} ⭐</span></div>
                                </div>

                                {/* Category & Rating Badges */}
                                <div className="flex gap-3 mt-6">
                                    <span className="px-6 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-2xl">
                                        {book.category}
                                    </span>
                                    <span className="px-6 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-2xl">
                                        Rating {book.rating}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 w-52 justify-center">
                                <Link
                                    to={`/bookDetails/${book.bookId}`}
                                    className="bg-green-500 hover:bg-green-600 text-white text-center py-3.5 rounded-2xl font-semibold transition"
                                >
                                    View Details
                                </Link>

                                <button
                                    onClick={() => handleRemove(book.bookId)}
                                    className="border border-red-500 text-red-500 hover:bg-red-50 py-3.5 rounded-2xl font-semibold transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={2500} />
        </div>
    );
};

export default Books;