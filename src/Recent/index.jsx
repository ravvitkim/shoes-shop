import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Recent() {
  const [recentItems, setRecentItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 가져오기
    const stored = localStorage.getItem("recent");
    if (stored) {
      setRecentItems(JSON.parse(stored));
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem("recent");
    setRecentItems([]);
  };

  // localStorage가 비어있으면 메시지 출력
  if (recentItems.length === 0) {
    return <div className="container py-4">최근 본 상품이 없습니다.</div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">최근 본 상품</h4>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={handleClear}
        >
          전체 지우기
        </button>
      </div>

      <div className="row g-3">
        {recentItems.map((item) => (
          <div className="col-6 col-md-4 col-lg-3" key={item.id}>
            <div
              className="card h-100"
              role="button"
              onClick={() => navigate(`/detail/${item.id}`)}
            >
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
              />
              <div className="card-body">
                <div className="fw-semibold">{item.title}</div>
                <div className="text-muted small">{item.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
