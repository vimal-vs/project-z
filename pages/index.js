import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState("");
  // const [name, setname] = useState("");
  // const [price, setPrice] = useState("");

  const sendData = async () => {
    try {
      const getPrice = await fetch(`https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BNSX`);
      if (!getPrice.ok) {
        throw new Error(getPrice.statusText);
      }
      const res = await getPrice.json();
      setData(res.data);
      const name = res.data.company;
      const price = res.data.pricecurrent;
      const time = res.data.lastupd;

      const response = await fetch(`/api/create?name=${name}&price=${price}&time=${time}`);
      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    sendData();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-20">
      <button onClick={handleClick}>Fetch</button>
      {JSON.stringify(data)}
    </div>
  );
};

export default Page;
