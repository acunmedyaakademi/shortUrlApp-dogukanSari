"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Shortly() {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [longUrl, setLongUrl] = useState(null);
  const router = useRouter(null);

  const findShortUrl = () => {
    dataSend(longUrl, makeid(7));
  }

  const copyToClipboard = () => {
    if (data?.short_url) {
      navigator.clipboard.writeText(data.short_url);
      alert("Link copied to clipboard!");
    }
  }

  const goToLink = () => {
    router.push(`/${data?.long_url}`);
  };

  const fetchedData = async() => {
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4ZG1hZG9weWxxendkZHZ4bmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NjY1NjEsImV4cCI6MjA0MzU0MjU2MX0.VWXtziyfAVzJTz-M8iqND-_hgE69Nmzb6e8ZpGx36DE"
    const apiUrl = "https://yxdmadopylqzwddvxncx.supabase.co/rest/v1/urls?select=*"

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      }
    });

    const resData = await res.json();

    if (resData) {
      const newData = resData.find((x) => x.long_url === longUrl);
      setData(newData);
    }
    return setProducts(resData);
  }

  useEffect(() => {
    fetchedData();
  }, []);

  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const dataSend = async (long, short) => {
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4ZG1hZG9weWxxendkZHZ4bmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NjY1NjEsImV4cCI6MjA0MzU0MjU2MX0.VWXtziyfAVzJTz-M8iqND-_hgE69Nmzb6e8ZpGx36DE"
    const apiUrl = "https://yxdmadopylqzwddvxncx.supabase.co/rest/v1/urls?select=*"

    const payload = {
      long_url: long,
      short_url: short,
    };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if(res?.ok) {
      await fetchedData();
    }

    return alert(
      JSON.stringify(res?.ok)
      ? `${payload.long_url} başarıyla ${payload.short_url} olarak kısaltıldı ve database e kaydedildi.`
      : `Kısaltma işlemi başarısız oldu. ${res?.status} - ${res?.statusText}`
    )
  };

  return (
    <>
      <div className="formContainer">
        <div className="form">
          <input
            type="text"
            placeholder="Shorten a link here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button onClick={() => findShortUrl()}>Shorten It!</button>
        </div>
        <div className="shortUrl">
          <p>{data?.short_url}</p>
          <div className="buttons">
            <button onClick={copyToClipboard}>Copied</button>
            <button onClick={() => goToLink()}>Go To Url</button>
          </div>
        </div>
      </div>
    </>
  );
}