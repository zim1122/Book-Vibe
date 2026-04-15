import React from 'react';

const BookCard = ({ books }) => {   // ✅ props নিতে হবে
    return (
        <div className='my-12 max-w-7xl mx-auto px-4'>
            <h2 className='font-bold text-3xl text-center mb-8'>Books</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    books.map((book, index) => (
                        <div key={index} className="card bg-base-100 shadow-md rounded-2xl">
                            
                            <figure className="p-6 bg-gray-100 rounded-t-2xl">
                                <img
                                    src={book.image}
                                    alt={book.bookName}
                                    className="h-48 object-contain"
                                />
                            </figure>

                            <div className="card-body">
                                <div className="flex gap-2 flex-wrap">
                                    {
                                        book.tags?.map((tag, i) => (
                                            <span key={i} className="badge badge-success badge-outline">
                                                {tag}
                                            </span>
                                        ))
                                    }
                                </div>

                                <h2 className="card-title text-xl font-bold">
                                    {book.bookName}
                                </h2>

                                <p className="text-gray-500">
                                    By : {book.author}
                                </p>

                                <hr />

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">{book.category}</span>

                                    <div className="flex items-center gap-1">
                                        <span>{book.rating}</span>
                                        ⭐
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default BookCard;