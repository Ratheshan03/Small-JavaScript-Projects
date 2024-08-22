import { useState, useEffect } from "react";
import axios from "axios";

function NewMot() {
  const [ans, setAns] = useState("mot msg getting ready");
  const [author, setAuthor] = useState(""); // State for author search
  const [quoteAuthor, setQuoteAuthor] = useState(""); // State for displaying the author of the quote

  useEffect(() => {
    const intervalId = setInterval(() => {
      gm();
      // Change background color
      document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const gm = () => {
    // API endpoint for fetching quotes based on author if specified
    let urladd = author
      ? `https://api.quotable.io/quotes?author=${encodeURIComponent(author)}`
      : "https://api.quotable.io/random";
    
    axios.get(urladd)
      .then(res => {
        if (Array.isArray(res.data.results)) {
          const randomQuote = res.data.results[Math.floor(Math.random() * res.data.results.length)];
          setAns(randomQuote.content);
          setQuoteAuthor(randomQuote.author || "Unknown");
        } else {
          setAns(res.data.content);
          setQuoteAuthor(res.data.author || "Unknown");
        }
      })
      .catch(err => {
        setAns("Error fetching quote");
        setQuoteAuthor("");
      });
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  return (
    <div>
      <center>
        <h1>Mot App by PP</h1>
        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={handleAuthorChange}
        />
        <button onClick={gm}>Get Quote</button>
        <h2>{ans}</h2>
        <h3>{quoteAuthor}</h3>
      </center>
    </div>
  );
}

export default NewMot;
