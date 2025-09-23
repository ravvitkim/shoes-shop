import { useNavigate } from "react-router-dom";

function Product({ shoes }) {
  const image = `/images/shoes${shoes.id + 1}.jpg`;
  const navigate = useNavigate();

  let handleClick = () => {

    const productData = {
      id: shoes.id,
      title: shoes.title,
      content: shoes.content,
      price: shoes.price,
      image: `/images/shoes${shoes.id + 1}.jpg`,
    };

    let getRecentData = localStorage.getItem("recent");
    let saveData = [];

    if (!getRecentData) {
      // 숫자 대신 객체 저장
      saveData.unshift(productData);
      localStorage.setItem("recent", JSON.stringify(saveData));
    } else {
      saveData = JSON.parse(getRecentData);
      saveData.unshift(productData);

      // id 기준 중복 제거
      saveData = saveData.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );

      localStorage.setItem("recent", JSON.stringify(saveData));
    }

    navigate(`/detail/${shoes.id}`);
  };

  return (
    <>
      <img onClick={() => handleClick()} src={image} width="80%" />
      <h4>{shoes.title}</h4>
      <p>{shoes.content}</p>
    </>
  );
}
export default Product;
