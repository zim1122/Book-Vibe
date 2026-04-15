import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReadWishlistPage = () => {
    const [activeTab, setActiveTab] = useState("read"); // "read" or "wishlist"
    const [readBooks, setReadBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedRead = JSON.parse(localStorage.getItem("readBooks") || "[]");
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setReadBooks(savedRead);
        setWishlist(savedWishlist);
    }, []);

    const handleRemoveFromRead = (bookId) => {
        const updated = readBooks.filter(book => book.bookId !== bookId);
        setReadBooks(updated);
        localStorage.setItem("readBooks", JSON.stringify(updated));
        toast.info("Book removed from Read list");
    };

    const handleRemoveFromWishlist = (bookId) => {
        const updated = wishlist.filter(book => book.bookId !== bookId);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        toast.info("Book removed from Wishlist");
    };

    const currentBooks = activeTab === "read" ? readBooks : wishlist;
    const isReadTab = activeTab === "read";

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-10">
                <button
                    onClick={() => setActiveTab("read")}
                    className={`px-8 py-3 rounded-2xl font-semibold text-lg transition ${isReadTab
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    Read Books
                </button>
                <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`px-8 py-3 rounded-2xl font-semibold text-lg transition ${!isReadTab
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    Wishlist Books
                </button>
            </div>

            {/* Sort By (as in Figma) */}
            <div className="flex justify-end mb-6">
                <div className="bg-green-500 text-white px-6 py-2 rounded-2xl flex items-center gap-2 font-medium cursor-pointer hover:bg-green-600 transition">
                    Sort By 
                    <span>▼</span>
                </div>
            </div>

            {/* Books List */}
            {currentBooks.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500">
                        {isReadTab ? "No books marked as read yet" : "Your wishlist is empty"}
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {currentBooks.map((book) => (
                        <div
                            key={book.bookId}
                            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex gap-8 hover:shadow-md transition"
                        >
                            {/* Book Cover */}
                            <div className="w-28 flex-shrink-0">
                                <img
                                    src={book.image}
                                    alt={book.bookName}
                                    className="w-full h-40 object-contain rounded-2xl shadow"
                                />
                            </div>

                            {/* Book Info */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {book.bookName}
                                </h2>
                                <p className="text-gray-600 mt-1">By : {book.author}</p>

                                {/* Tags */}
                                <div className="flex gap-2 mt-4">
                                    {book.tags?.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-600">
                                    <div>📖 Publisher: {book.publisher}</div>
                                    <div>📄 Page {book.totalPages}</div>
                                    <div>📅 {book.yearOfPublishing}</div>
                                    <div>⭐ {book.rating}</div>
                                </div>

                                {/* Category & Rating Badges */}
                                <div className="flex gap-3 mt-6">
                                    <span className="px-5 py-1.5 bg-blue-100 text-blue-700 rounded-2xl text-sm font-medium">
                                        {book.category}
                                    </span>
                                    <span className="px-5 py-1.5 bg-amber-100 text-amber-700 rounded-2xl text-sm font-medium">
                                        Rating {book.rating}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 w-48 justify-center">
                                <Link
                                    to={`/bookDetails/${book.bookId}`}
                                    className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-2xl font-semibold transition"
                                >
                                    View Details
                                </Link>

                                <button
                                    onClick={() => isReadTab 
                                        ? handleRemoveFromRead(book.bookId) 
                                        : handleRemoveFromWishlist(book.bookId)}
                                    className="border border-red-500 text-red-500 hover:bg-red-50 py-3 rounded-2xl font-semibold transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ToastContainer position="top-right" autoClose={2500} />
        </div>
    );
};

export default ReadWishlistPage;