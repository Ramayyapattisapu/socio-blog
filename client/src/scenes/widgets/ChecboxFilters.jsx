import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";

const CheckboxFilters = ({ applyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  const handleApplyFilters = () => {
    let categoryFilter = selectedFilters.join(","); // Convert to string here

    if (selectedFilters.length === 0) {
      categoryFilter = "All"; // Default to "All" if no filters are selected
    }

    fetch(
      `https://socio-blog.onrender.com/post/category?category=${categoryFilter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setPosts({ posts: data }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <WidgetWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 10,
        }}
      >
        <label>
          <Checkbox value="Technology" onChange={handleCheckboxChange} />
          Technology
        </label>
        <label>
          <Checkbox value="Travel" onChange={handleCheckboxChange} />
          Travel
        </label>
        <label>
          <Checkbox value="Education" onChange={handleCheckboxChange} />
          Education
        </label>
        <label>
          <Checkbox value="Sports" onChange={handleCheckboxChange} />
          Sports
        </label>
        <label>
          <Checkbox value="AutoBio" onChange={handleCheckboxChange} />
          AutoBio
        </label>
        <label>
          <Checkbox value="Reviews" onChange={handleCheckboxChange} />
          Reviews
        </label>
        <Button variant="contained" onClick={handleApplyFilters}>
          Filter Posts
        </Button>
      </div>
    </WidgetWrapper>
  );
};

export default CheckboxFilters;
