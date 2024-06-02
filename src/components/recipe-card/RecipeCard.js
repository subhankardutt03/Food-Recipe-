import React from "react";
import styles from "./RecipeCard.module.css";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <div className={styles.recipe__card}>
        <img
          src={recipe.recipe.image}
          alt="reipe-card-img"
          className={styles.recipe__image}
          onClick={() => window.open(recipe.recipe.url)}
        />
        <p className={styles.recipe__name}>{recipe.recipe.label}</p>
      </div>
    </>
  );
};

export default RecipeCard;
