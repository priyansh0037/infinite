import React, { useEffect, useState } from "react";

const App = () => {
  // dummy json api we are using

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/?limit=5&skip=${(page)}`
    );

    const data = await response.json();
    // console.log(data.products);
    setProducts((prev) => [...prev, ...data.products]);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // okey
const handelIndefiniteScroll = async() => {
  // console.log(document.documentElement.scrollHeight,"pure page ki height"); //pure page ki height

  // console.log(window.innerHeight,"viewport screen") 

  // console.log(document.documentElement.scrollTop,"ye btyga scrolle bottom se touch kb hua")

  // inner height + scrroll top = scroll heught 

  // ! LOGIC ! jb inner height and scrol to dono ki value greter ho jaygi scroll height se tb hmko new data show krna ha 

  try {

    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
setPage((prev)=> prev + 1)
    }
  } catch (error) {
    console.log(error)
  }
}

// inner height viewport height show krega mttlb jb web page open hoga to user kitna page dekh rha ha uski height 

//document.documentElement.scrollHeight ye btata ha ki apke pure document ki height kiti ha 

// document.documentElement.scrollTop iski help se hm pta lga skte ha ki humney scrollbar ko sbse neche touch kr dia

useEffect(() => {
  window.addEventListener("scroll", handelIndefiniteScroll);
  // yha hmko clen up fn bnana pdega

  return () => {
    window.removeEventListener("scroll", handelIndefiniteScroll);
  }
},[])

  return (
    <>
      <div className="mb-10">
        <div className="text-center mt-10 font-semibold text-4xl">Products</div>
        <div className="grid mt-10 mx-10 md:grid-cols-3 grid-cols-1 gap-6">
          {products?.length > 0 &&
            products.map((product,index) => (
              <div
                key={index}
                className="w-full h-full bg-zinc-400 cursor-pointer p-10 gap-5 rounded-lg flex flex-col justify-center items-center"
              >
                <img
                  src={product?.thumbnail}
                  alt={product?.title}
                  className="rounded-lg hover:scale-[108%] transition-all duration-300"
                />
                <span className="font-semibold text-xl">{product?.title}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
