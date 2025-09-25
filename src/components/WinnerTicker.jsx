import React from "react";
import { FaStar } from "react-icons/fa";
import "./WinnerTicker.css";

export default function WinnerTicker({ winnerDetails = [], mode }) {
  return (
    <div
      className={`winner-ticker-container ${
        mode === "light" ? "light-mode" : ""
      }`}
    >
      <svg width="0" height="0">
        <defs>
          <linearGradient id="starGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FE8B76" />
            <stop offset="100%" stopColor="#6360BE" />
          </linearGradient>
        </defs>
      </svg>
      <div className="winner-ticker-track">
        {winnerDetails?.map((winner, index) => (
          <div className="winner-ticker-item" key={index}>
            <FaStar
              className="winner-icon gradient-icon"
              style={{ fill: "url(#starGradient)" }}
            />
            <span className="winner-text">
              <span>{winner.month} Top Blogs : </span>
              {winner.winnerName} - "
              <a
                href={winner.blogLink}
                target="_blank"
                rel="noopener noreferrer"
                className="winner-link"
              >
                {winner.blogTitle}
              </a>
              "
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
