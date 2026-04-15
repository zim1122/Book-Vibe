import { useState, useEffect } from 'react';

const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/booksData.json")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch books data");
                }
                return res.json();
            })
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching books:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { books, loading, error };
};

export default useBooks;