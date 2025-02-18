import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./DatingCards.css";
import axios from "./axios.js";

const DatingCards = () => {
  /*const [people, setPeople] = useState([
    {
      name: "Random Guy",
      imgUrl:
        "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg",
    },
    {
      name: "Random Girl",
      imgUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/05/Beautiful-Girl-Hd-Wallpapers-1080p-Images.jpg",
    },
    {
      name: "Another Guy",
      imgUrl:
        "https://cdn.quotesgram.com/img/85/87/1731438144-BcogIEmIEAA3O5m.jpg",
    },
    {
      name: "Another Girl",
      imgUrl: "https://cdn.wallpapersafari.com/87/7/8QCtNK.jpg",
    },
  ]);*/

  const [people, setPeople] = useState([]);
  useEffect(() => {
    async function fetchData() {
      console.log("HERE IN USEEFFECT");
      const req = await axios.get("/dating/cards");
      setPeople(req.data);
    }
    fetchData();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("receiving " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!!");
  };

  return (
    <div className="datingCards">
      <div className="datingCards__container">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${person.imgUrl})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default DatingCards;
