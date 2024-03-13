import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [batch_number, set_batch_number] = useState("");
  const [product_id, set_product_id] = useState("");
  const [products_manufactured, set_products_manufactured] = useState("");
  const [product, set_product] = useState("");
  const [acq,setAcq] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const url =`http://127.0.0.1:3001/api/?batch_number=${batch_number}&product_id=${product_id}&products_manufactured=${products_manufactured}&product=${product}`
    console.log(url)
    fetch(url, {
      method: "GET",
      headers: {
          "Origin": "http://localhost:5173",
      }}).then((res)=>{return res.json()}).then((data)=>{
        setAcq(data)
      })
  };

  // useEffect(() => {

  // }, [acq]);

  return (
    <div className="p-4 bg-red-500 h-screen flex">
      <form
        onSubmit={handleSubmit}
        className="border-r-4 p-4 flex items-center justify-center w-64 gap-4 flex-col"
      >
        <h2 className="text-3xl text-white font-black">Submit Entry</h2>
        <input
          className="focus:ring-4 focus:ring-offset-3 hover:scale-95 hover:rotate-1 focus:scale-95 focus:rotate-1 focus:ring-red-500 transition-all h-10 outline-none rounded-lg p-2 font-bold text-center"
          onChange={(event) => {
            set_batch_number(event.target.value);
          }}
          value={batch_number}
          placeholder="batch number"
        />
        <input
          className="focus:ring-4 focus:ring-offset-3 hover:scale-95 hover:rotate-1 focus:scale-95 focus:rotate-1 focus:ring-red-500 transition-all h-10 outline-none rounded-lg p-2 font-bold text-center"
          onChange={(event) => {
            set_product_id(event.target.value);
          }}
          value={product_id}
          placeholder="product id"
        />
        <input
          className="focus:ring-4 focus:ring-offset-3 hover:scale-95 hover:rotate-1 focus:scale-95 focus:rotate-1 focus:ring-red-500 transition-all h-10 outline-none rounded-lg p-2 font-bold text-center"
          onChange={(event) => {
            set_products_manufactured(event.target.value);
          }}
          value={products_manufactured}
          placeholder="products manufactured"
        />
        <input
          className="focus:ring-4 focus:ring-offset-3 hover:scale-95 hover:rotate-1 focus:scale-95 focus:rotate-1 focus:ring-red-500 transition-all h-10 outline-none rounded-lg p-2 font-bold text-center"
          onChange={(event) => {
            set_product(event.target.value);
          }}
          value={product}
          placeholder="product name"
        />
        <button className="text-xl outline-none transition-all hover:scale-95 hover:rotate-1 focus:scale-95 focus:rotate-1 text-red-500 bg-white py-2 rounded-lg px-6 font-black">
          Submit
        </button>
      </form>
      <div className="flex-1 p-4 flex-col flex">
        <div className="overflow-scroll no-scroll flex-1 items-center justify-center grid gap-4 flex-wrap">
          {
            acq?.map((data)=>{
              console.log(data)
              return <div className="border-t-4 w-full p-2 grid text-center gap-2 text-white" key={data.url}>
                <p className="text-sm bg-white p-2 text-red-500 text-left"><b className="uppercase">url for this qr</b> : <br />{data.url}</p>
                <img className="h-30 w-30" src={data.qr} alt="qr code" />
              </div>
            })
          }
        </div>
        <div className="border-t-4 p-2 text-center text-white">
          This is just a demo frontend that can be built as per the client's
          preference. This can generate any number of QR codes valid for
          eternity and best part is that these QR codes need not to be saved on
          any server hard drives, the codes can simply be saved in the database.
        </div>
      </div>
    </div>
  );
}

export default App;
