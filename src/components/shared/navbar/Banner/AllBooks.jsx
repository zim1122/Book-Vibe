import React, { useEffect, useState } from 'react';

const AllBook = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("/booksData.json")
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    return (
        <div className='my-12'>
            <h2 className='font-bold text-3xl text-center'>Books</h2>

            <div>
                {
                    books.map((book, index) => (
                        <p key={index}>{book.name}</p>
                    ))
                }
            </div>
        </div>
    );
};

export default AllBook;