import React, { useEffect, useState } from "react";
import { apiCall } from "../../../api/mockedAPI";
import { Card } from "./card";
import styles from "./cards-container.module.scss";
import { CardsCreationForm } from "./cards-creation-form";

const CardsContainer = (props) => {
  const [cards, setCards] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [genderValue, setGenderValue] = useState("male");
  const [priceValue, setPriceValue] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);

  useEffect(() => {
    apiCall().then((data) => {
      setCards(data);
    });
  }, []);

  const handleChangeTitle = (e) => {
    setTitleValue(e.target.value);
  };

  const handleChangeGender = (e) => {
    setGenderValue(e.target.value);
  };

  const handleChangePrice = (e) => {
    if (e.target.value >= 0 && e.target.value <= 5000) {
      setPriceValue(e.target.value);
    }
  };

  const handleChangeImage = (e) => {
    setImageValue(e.target.value);
  };

  const deleteCards = (id) => {
    const newCardsData = cards.filter((item) => item.id !== Number(id));
    setCards(newCardsData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      titleValue !== "" &&
      genderValue !== "" &&
      priceValue !== "" &&
      imageValue !== ""
    ) {
      setIsFieldEmpty(false);
      const arrayId = cards.length !== 0 ? cards.map((item) => item.id) : [1];
      const newId = Math.max(...arrayId);
      const newCard = {
        id: newId + 1,
        price: priceValue,
        title: titleValue,
        imageUrl: imageValue,
        gender: genderValue,
      };
      setCards([...cards, newCard]);
      setTitleValue("");
      setPriceValue("");
      setGenderValue("male");
      setImageValue("");
      return;
    }
    setIsFieldEmpty(true);
  };

  const handleClick = (e) => {
    const selectedCard = e.target.closest("button");
    if (selectedCard && selectedCard.dataset.name === "cross") {
      deleteCards(selectedCard.dataset.id);
      return;
    }
  };

  if (!cards.length) {
    return (
      <section className={styles.content}>
        <div className="wrapper">
          <p className={styles.noCards}>No cards yet</p>
          <CardsCreationForm
            onSubmit={handleSubmit}
            handleSubmit={handleSubmit}
            handleChangeTitle={handleChangeTitle}
            handleChangePrice={handleChangePrice}
            handleChangeGender={handleChangeGender}
            handleChangeImage={handleChangeImage}
            titleValue={titleValue}
            genderValue={genderValue}
            priceValue={priceValue}
            imageValue={imageValue}
            isFieldEmpty={isFieldEmpty}
          />
        </div>
      </section>
    );
  }
  return (
    <section className={styles.content}>
      <div className="wrapper">
        <h2 className={styles.title}>Armor</h2>
        <ul onClick={handleClick} className={styles.list}>
          {cards.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                gender={card.gender}
                image={card.imageUrl}
                price={card.price}
              />
            );
          })}
        </ul>
        <CardsCreationForm
          onSubmit={handleSubmit}
          handleSubmit={handleSubmit}
          handleChangeTitle={handleChangeTitle}
          handleChangePrice={handleChangePrice}
          handleChangeGender={handleChangeGender}
          handleChangeImage={handleChangeImage}
          titleValue={titleValue}
          genderValue={genderValue}
          priceValue={priceValue}
          imageValue={imageValue}
          isFieldEmpty={isFieldEmpty}
        />
      </div>
    </section>
  );
};
export default CardsContainer;
