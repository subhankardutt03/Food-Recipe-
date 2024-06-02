import React, { useState } from "react";
import styles from "./Input.module.css";
import axios from "axios";
import RecipeCard from "../recipe-card/RecipeCard";
import NoRecordsFound from "../No-records-found/NoRecordsFound";
import { ColorRing } from "react-loader-spinner";

const Input = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [healthLabel, setHealthLable] = useState("vegetarian");
  const [noRecords, setNoRecords] = useState(false);
  const [loading, setLoading] = useState(false);
  const YOUR_APP_ID = process.env.REACT_APP_ID;
  const YOUR_APP_KEY = process.env.REACT_APP_KEY;
  const API_URL = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;

  const getRecipies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      const responseData = response.data.hits;
      if (responseData.length === 0) {
        setNoRecords(true);
      }
      setRecipes(responseData);
    } catch (error) {
      console.error("Error fetching the recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipies();
  };

  const handleChange = (val) => {
    if (!val) {
      setNoRecords(false);
    }
    setQuery(val);
  };

  return (
    <>
      <div className={styles.app_container}>
        <form className={styles.app__searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            placeholder="Type of Ingredient"
            className={styles.app__search}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
          />
          <select
            onChange={(e) => setHealthLable(e.target.value)}
            className={styles.app__healthLabels}
          >
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="wheat-free">Wheat-Free</option>
            <option value="red-meat-free">Red-Meat-Free</option>
            <option value="low-sugar">Low Sugar</option>
            <option value="egg-free">Egg-Free</option>
            <option value="alcohol-free">Alcohol-Free</option>
            <option value="kidney-friendly">Kidney-Friendly</option>
            <option value="tree-nut-free">Tree-Nut-Free</option>
            <option value="No-oil-added">No oil added</option>
          </select>
          <input
            type="submit"
            value="Get Recipe"
            className={styles.app__submit}
          />
        </form>
        {loading ? (
          <div className={styles.loader}>
            <ColorRing type="Circles" color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <div className={styles.recipe__card__grid__container}>
            {recipes.length > 0
              ? recipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))
              : noRecords && <NoRecordsFound />}
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
