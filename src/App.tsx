import { useState } from "react";
import "./App.css";
import { RSSObject } from "../models/models";
import RSSDisplayObject from "../components/rss-object";

function App() {
  const [input, setInput] = useState("");
  const [xmlData, setXmlData] = useState<RSSObject[]>([]);

  const fetchData = async () => {
    const response = await fetch(input);
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");
    console.log(xmlDoc);
    const items = xmlDoc.getElementsByTagName("item");
    console.log(items);
    const itemArray = [];
    for (const element of items) {
      const guid = element.getElementsByTagName("guid")[0].textContent;
      const newItem = {
        title: element.getElementsByTagName("title")[0].textContent ?? "",
        link: guid ? guid : "",
        description:
          element.getElementsByTagName("description")[0].textContent ?? "",
      };
      itemArray.push(newItem);
    }
    setXmlData(itemArray);
  };

  return (
    <div className="flex flex-col">
      <h1 className="mb-5">RSS Feed Parser</h1>
      <div className="flex flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Enter RSS Feed URL"
          className="rounded w-screen pl-4"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button className="pl-5 " onClick={fetchData}>
          Submit
        </button>
      </div>
      {xmlData.map((item) => (
        <RSSDisplayObject
          key={item.link}
          title={item.title}
          link={item.link}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default App;
