import React, { useState, useEffect } from "react";
import yaml from "js-yaml";
import Spinner from "./Spinner.jsx";

const App = () => {
  const [items, setItems] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    window.addEventListener("unload", () => setCurrentId(null));
    const requestData = async () => {
      const response = await fetch("settings.txt");
      const responseText = await response.text();
      const responseItems = yaml.load(responseText);
      responseItems.sort((a, b) => a.id - b.id);
      const imgLinks = responseItems.map((item) => item.image);
      const isImageExists = await Promise.all(
        imgLinks.map((link) => fetch(link).then((response) => response.ok)),
      );
      isImageExists.forEach((item, i) => {
        responseItems[i]["isImage"] = item;
      });
      setItems(responseItems);
    };
    requestData();
    return () => {
      window.removeEventListener("unload", () => setCurrentId(null));
    };
  }, []);

  return (
    <ul className="catalog">
      {items.map(({ id, url, title, image, isImage }, i) => (
        <li key={i}>
          <a
            href={url}
            className={id === currentId ? "selected" : null}
            onClick={() => setCurrentId(id)}
          >
            <div className="logo-container">
              {isImage ? (
                <div className="logo">
                  <img className="img" src={image} alt={title}></img>
                </div>
              ) : null}
              <div className="spinner">
                <Spinner className="spinner" />
              </div>
            </div>
            <p className="title">{title}</p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default App;
