import React, { useEffect, useState } from 'react';
import BookCard from '../../../BookCard/BookCard';

const AllBook = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("/booksData.json")
            .then(res => res.json())
            .then(data => {
                console.log("Fetched Books:", data);
                setBooks(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <BookCard books={books}></BookCard>   // ✅ এখানে props pass করতে হবে
    );
};

export default AllBook;