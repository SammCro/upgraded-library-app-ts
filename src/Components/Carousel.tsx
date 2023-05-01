import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react";
import BookModel from "../Models/BookModel";
import Spinner from "../Utils/Spinner";

export const Carousel = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8090/api/books";
      const url: string = `${baseUrl}?page=0&size=9`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Could not fetch books.");
      }

      const responseData = await response.json();
      const books = responseData._embedded.books;
      const tempBooks: BookModel[] = [];
      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const tempBook: BookModel = {
          id: book.id,
          title: book.title,
          author: book.author,
          description: book.description,
          copies: book.copies,
          copies_available: book.copies_available,
          img: book.img,
        };
        tempBooks.push(tempBook);
      }
      setBooks(tempBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((err: any) => {
      setError(err.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-5" style={{ height: 550 }}>
        <Spinner />
      </div>
    );
  }

  if (error !== "") {
    return (
      <div className="container mt-5" style={{ height: 550 }}>
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
                d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(0, 3).map((book: BookModel) => (
                <ReturnBook key={book.id} book={book}></ReturnBook>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(3, 6).map((book: BookModel) => (
                <ReturnBook key={book.id} book={book}></ReturnBook>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(6, 9).map((book: BookModel) => (
                <ReturnBook key={book.id} book={book}></ReturnBook>
              ))}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="text-center">
            <ReturnBook book={books[0]} key={books[0].id}></ReturnBook>
          </div>
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <a className="btn btn-outline-secondary btn-lg" href="#">
          View More
        </a>
      </div>
    </div>
  );
};
