import React from "react";

interface Scientist {
  name: string;
  src: string;
  profession: string;
  awardCount: number;
  awards: string;
  discovery: string;
}

interface Props {
  data: Scientist;
}

export const Card = ({ data }: Props) => {
  const { name, src, profession, awardCount, awards, discovery } = data;
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img className="avatar" src={src} alt={name} width={70} height={70} />
      <ul>
        <li>
          <b>Profession: </b>
          {profession}
        </li>
        <li>
          <b>Awards: {awardCount} </b>({awards})
        </li>
        <li>
          <b>Discovered: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
};
