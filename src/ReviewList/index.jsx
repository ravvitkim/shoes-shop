import Review from '../Review';

function ReviewList({ reviewList, productId }) {
  const thisProductReviews = reviewList.filter(r => r.productId === productId);

  if (thisProductReviews.length === 0) {
    return <div>리뷰가 없습니다.</div>;
  }

  return (
    <div>
      <h4>상품 리뷰</h4>
      
      {thisProductReviews.map((review, i) => (
        <Review
          key={i}
          title={review.title}
          point={review.point}
          content={review.content}
        />
      ))}
    </div>
  );
}


export default ReviewList;


