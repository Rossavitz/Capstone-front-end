import React, { useState, useEffect } from "react";
import Select from "react-select";
import RecipeApi from "../api";
import "./DropdownSearch.css";

const Dropdown = ({ search }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  //load all recipes w/ tags
  useEffect(function getAllTags() {
    getTags();
  }, []);

  async function getTags() {
    let tags = await RecipeApi.getTags();
    let option = tags.map((t) => ({ value: t.tag, label: t.tag }));
    let searchAll = { value: "Search All", label: "Search All" };
    option.unshift(searchAll);
    setOptions(option);
  }

  //if a tag is chosen, load those recipes, else search all tags and show recipes
  function handleSubmit(e) {
    if (selectedOption.value !== "Search All") {
      e.preventDefault();
      search(selectedOption.value);
    } else {
      e.preventDefault();
      search();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="dropdown">
        <h3>Search recipes:</h3>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isSearchable
          isClearable
        />
        <button className="dropdown-btn">Search</button>
      </form>
    </div>
  );
};

export default Dropdown;
