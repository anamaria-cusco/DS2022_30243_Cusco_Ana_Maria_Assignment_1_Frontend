import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h2>Energy Utility Platform | Keep you energy smarter</h2>
      <p>
        &copy; <span>{year}</span> Copyright
        Reserved To{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/anamaria.cusco/"
        >
          Ana-Maria Cusco
        </a>
      </p>
    </footer>
  );
}
