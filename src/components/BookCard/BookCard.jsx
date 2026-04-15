import React from 'react';
import { Link } from 'react-router';   // Fixed import

const BookCard = ({ books }) => {
    return (
        <div className='my-12 max-w-7xl mx-auto px-4'>
            <h2 className='font-bold text-3xl text-center mb-8'>Books</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {books.map((book) => (
                    <Link 
                        key={book.bookId} 
                        to={`/bookDetails/${book.bookId}`}   // ← Changed to match your route
                        className="card bg-base-100 shadow-md rounded-2xl hover:shadow-xl transition-shadow block"
                    >
                        <figure className="p-6 bg-gray-100 rounded-t-2xl">
                            <img
                                src={book.image}
                                alt={book.bookName}
                                className="h-48 object-contain w-full"
                            />
                        </figure>

                        <div className="card-body">
                            <div className="flex gap-2 flex-wrap">
                                {book.tags?.map((tag, i) => (
                                    <span 
                                        key={i} 
                                        className="badge badge-success badge-outline text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h2 className="card-title text-xl font-bold mt-3">
                                {book.bookName}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                By : {book.author}
                            </p>

                            <hr className="my-4" />

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">{book.category}</span>

                                <div className="flex items-center gap-1 text-sm">
                                    <span>{book.rating}</span>
                                    <span className="text-yellow-500">⭐</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BookCard;