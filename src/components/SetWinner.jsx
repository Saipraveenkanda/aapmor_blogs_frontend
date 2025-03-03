import React, { useState } from "react";
import "./adminwinnerform.css";
import Header from "./HomePage/header";
import { postWinnerDetails } from "./ApiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
const AdminWinnerForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const previousMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date(new Date().setMonth(new Date().getMonth() - 1)));

  const [formData, setFormData] = useState({
    winnerName: "",
    blogTitle: "",
    blogLink: "",
    month: previousMonth,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const validate = () => {
    let newErrors = {};
    if (!formData.winnerName.trim())
      newErrors.winnerName = "Winner name is required";
    if (!formData.blogTitle.trim())
      newErrors.blogTitle = "Blog title is required";
    // if (!formData.month.trim()) newErrors.month = "Month is required";
    if (!formData.blogLink.trim() || !/^https?:\/\//.test(formData.blogLink)) {
      newErrors.blogLink = "Valid blog link is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await postWinnerDetails(formData);
        if (response?.response?.data?.error) {
          alert(response?.response?.data?.error);
          navigate("/");
        }
        if (!response.status === 201) {
          throw new Error("Failed to save winner");
        } else if (response.status === 201) {
          alert("Winner has been set successfully!");
          setFormData({
            winnerName: "",
            blogTitle: "",
            description: "",
            blogLink: "",
            month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
              new Date()
            ),
          });
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="admin-form-container">
        <h2>Set Blog of the Month Winner</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Winner Name:
            <input
              type="text"
              name="winnerName"
              value={formData.winnerName}
              onChange={handleChange}
            />
            {errors.winnerName && (
              <span className="error">{errors.winnerName}</span>
            )}
          </label>

          <label>
            Blog Title:
            <input
              type="text"
              name="blogTitle"
              value={formData.blogTitle}
              onChange={handleChange}
            />
            {errors.blogTitle && (
              <span className="error">{errors.blogTitle}</span>
            )}
          </label>

          <label>
            Month:
            <input
              disabled
              type="text"
              name="month"
              value={previousMonth}
              onChange={handleChange}
            />
            {/* {errors.month && <span className="error">{errors.month}</span>} */}
          </label>

          <label>
            Blog Link:
            <input
              type="url"
              name="blogLink"
              value={formData.blogLink}
              onChange={handleChange}
            />
            {errors.blogLink && (
              <span className="error">{errors.blogLink}</span>
            )}
          </label>

          <button type="submit">Set Winner</button>
        </form>
      </div>
    </>
  );
};

export default AdminWinnerForm;
