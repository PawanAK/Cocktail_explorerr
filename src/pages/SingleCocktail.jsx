import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getCocktail = async () => {
      try {
        const response = await axios(`${url}${id}`);
        const data = response.data;
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktails = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };

          setCocktail(newCocktails);
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">No Cocktail to Display</h2>;
  }
  const { name, image, info, category, glass, instructions, ingredients } =
    cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data"> Name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data"> category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data"> info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data"> glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data"> instructions:</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item} ,</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
