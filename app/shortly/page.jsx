"use client";
export default function Shortly() {
  return (
    <>
      <div className="formContainer">
        <div className="form">
          <input
            type="text"
            placeholder="Shorten a link here..."
            value={longUrl}
          />
          <button>Shorten It!</button>
        </div>
        <div className="shortUrl">
          <p>Buraya short_url gelecek</p>
          <div className="buttons">
            <button>Copied</button>
            <button>Go To Url</button>
          </div>
        </div>
      </div>
    </>
  );
}