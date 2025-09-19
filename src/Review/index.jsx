function Review({ title, point, content}) {
  return (
    <div className="review">
      <h3>{title}</h3>
      <p>{'★'.repeat(point)}{'☆'.repeat(5 - point)}</p>
      <p>{content}</p>
    </div>
  );
}

export default Review;
