import * as React from "react";
import { RSSObject } from "../models/models";

export default function RSSDisplayObject(rss: RSSObject) {
  return (
    <div className="flex mt-4">
      <img
        src={"https://www.ivertech.com/Articles/Images/KoalaBear200x200.jpg"}
      />
      <div className="flex-col justify-start">
        <h2 className="text-justify">{rss.title}</h2>
        <p className="text-left">{rss.description}</p>
        <a href={rss.link} className="text-left">{rss.link}</a>
      </div>
    </div>
  );
}
