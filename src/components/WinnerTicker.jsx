
import React from "react";
import { FaStar } from "react-icons/fa";
import "./WinnerTicker.css";

export default function WinnerTicker({ winnerDetails = [] ,mode}) {
  return (
    <div className={`winner-ticker-container ${mode === "light" ? "light-mode" : ""}`}>
      <div className="winner-ticker-track">
        {winnerDetails.map((winner, index) => (
          <div className="winner-ticker-item" key={index}>
            <FaStar className="winner-icon" />
            <span className="winner-text">
           <span>{winner.month} Top BLogs : </span>
           
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
