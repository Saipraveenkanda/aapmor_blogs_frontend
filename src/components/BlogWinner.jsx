import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaHeart, FaCircle } from "react-icons/fa";
import "./WinnerAnnouncement.css";

const confettiCount = 50;

const generateConfetti = () => {
  const icons = [<FaStar />, <FaHeart />, <FaCircle />];
  return new Array(confettiCount).fill(0).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + "%",
    animationDelay: Math.random() * 5 + "s",
    animationDuration: Math.random() * 3 + 2 + "s",
    icon: icons[Math.floor(Math.random() * icons.length)],
  }));
};

export default function WinnerAnnouncement({ isOpen, onClose, winnerDetails }) {
  const [confetti, setConfetti] = useState([]);
  useEffect(() => {
    if (isOpen) {
      setConfetti(generateConfetti());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Falling Confetti */}
        {confetti.map((item) => (
          <motion.div
            key={item.id}
            className="confetti-item"
            style={{ left: item.left, top: "-90%" }}
            animate={{ y: "100vh", opacity: [1, 1, 0] }}
            transition={{
              duration: parseFloat(item.animationDuration),
              repeat: Infinity,
              delay: parseFloat(item.animationDelay),
            }}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Winner Certificate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="winner-card"
        >
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2 className="winner-title">🏆Best Blogs of the Month 🏆</h2>

          <p className="winner-description">
            Congratulations to our top bloggers for this month! 🎉
          </p>

          <ul className="winner-list">
            {winnerDetails?.map((winner, index) => (
              <li key={index} className="winner-item">
                🏆 <span className="winner-name">{winner.winnerName}</span> for{" "}
                <a
                  href={winner.blogLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="winner-blog"
                >
                  "{winner.blogTitle}"
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
