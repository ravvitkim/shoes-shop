import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Discount from "../Discount";
import Nav from 'react-bootstrap/Nav';
import TabContent from "../TabContent";


function Detail({ product }) {
  const [detailFade, setDetailFade] = useState('');
  const [showAlert, setShowAlert] = useState(true);

  const [reviewList, setReviewList] = useState([]);     // 전체 리뷰 리스트
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  const [tabState, setTabState] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setDetailFade('ani_end');
    }, 100);
    return () => {
      clearTimeout(timer);
      setDetailFade('');
    };
  }, []);

  useEffect(() => {
    const timer2 = setTimeout(() => setShowAlert(false), 2000);
    return () => clearTimeout(timer2);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const findProduct = product.find(item => item.id === Number(id));
  if (!findProduct) {
    alert('찾는 상품이 없습니다.');
    navigate(-1);
    return null;
  }

  // 리뷰 불러오기
  useEffect(() => {
    setReviewLoading(true);
    setReviewError(null);

    axios.get(`https://zzzmini.github.io/js/shoesReview.json`)
      .then(response => {
        const allReviews = response.data;
        setReviewList(allReviews);
        setReviewLoading(false);
      })
      .catch(err => {
        console.error(err);
        setReviewError(err);
        setReviewLoading(false);
      });
  }, [findProduct.id]);

  const productReviews = reviewList.filter(r => r.productId === findProduct.id);
  function AverageStars(reviews) {
  if (reviews.length === 0) return '';
  const total = reviews.reduce((sum, r) => sum + r.point, 0);
  const avg = Math.round(total / reviews.length); // 반올림
  return '★'.repeat(avg) + '☆'.repeat(5 - avg);
}


  return (
    <div className={`container ani_start ${detailFade}`}>
      <div className="container mt-2">
        {showAlert && <Discount />}
      </div>
      <div className="row">
        <div className="col-md-6">
          <img 
            src={`/images/shoes${findProduct.id + 1}.jpg`} 
            width="100%" 
            alt={findProduct.title} 
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      <Nav variant="tabs" activeKey={`link-${tabState}`}>
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => setTabState(0)}>특징</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => setTabState(1)}>사이즈</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => setTabState(2)}>배송</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" onClick={() => setTabState(3)}>
             {`리뷰(${productReviews.length}) ${AverageStars(productReviews)}`}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tabState={tabState} id={findProduct.id} reviewList={reviewList} />
    </div>
  );
}

export default Detail;
