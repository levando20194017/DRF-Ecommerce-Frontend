import React from "react";

interface Props {
  name: string;
  email: string;
  address: string;
  phone: string;
  website: string;
}

export const User = ({ name, email, address, phone, website }: Props) => {
  return (
    <div style={{ width: "500px" }}>
      <h1>{name}</h1>
      <p>Email: {email}</p>
      <p>Address: {address}</p>
      <p>Phone: {phone}</p>
      <p>Website: {website}</p>
    </div>
  );
};
