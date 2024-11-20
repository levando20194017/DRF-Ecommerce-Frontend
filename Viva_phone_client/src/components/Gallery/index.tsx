import { Card } from "../Card";
import { v4 as uuidv4 } from "uuid";

const data = [
  {
    name: "Maria Skłodowska-Curie",
    src: getImageUrl("szV5sdG"),
    profession: "physicist and chemist",
    awardCount: 4,
    awards: `Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal`,
    discovery: "polonium (element)",
  },
  {
    name: "Katsuko Saruhashi",
    src: getImageUrl("YfeOqp2"),
    profession: "geochemist",
    awardCount: 2,
    awards: "Miyake Prize for geochemistry, Tanaka Prize",
    discovery: "a method for measuring carbon dioxide in seawater",
  },
];

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <div
        className="card-container"
        style={{ display: "flex", flexDirection: "column", gap: "30px" }}
      >
        {/* <Card data={data[0]}/> */}
        {data.map((item, index) => (
          <Card data={item} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
}

function getImageUrl(imageId: string, size = "s") {
  return "https://i.imgur.com/" + imageId + size + ".jpg";
}

// 1,2,3,4,5
// 2 -> 1, 3 -> 2, 4 -> 3, 5 -> 4
// key must be unique in scope list
