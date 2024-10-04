"use client";

import { useRouter } from "next/router";
import { useState } from "react/cjs/react.production.min";

export default function Shortly() {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [longUrl, setLongUrl] = useState(null);
  const router = useRouter(null);

  const findShortUrl = () => {
    insertData(longUrl, makeid(7));
  }

  const copyToClipboard = () => {
    if (data?.short_url) {
      navigator.clipboard.writeText(data.short_url);
      alert("Link copied to clipboard!");
    }
  }
  return (
    <>
      <div className="formContainer">
        <div className="form">
          <input
            type="text"
            placeholder="Shorten a link here..."
            value={longUrl}
          />
          <button onClick={() => findShortUrl()}>Shorten It!</button>
        </div>
        <div className="shortUrl">
          <p>Buraya short_url gelecek</p>
          <div className="buttons">
            <button onClick={copyToClipboard}>Copied</button>
            <button>Go To Url</button>
          </div>
        </div>
      </div>
    </>
  );
}