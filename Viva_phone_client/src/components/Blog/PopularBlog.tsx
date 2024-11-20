import "./style.scss"

const PopularBlog = () => {
  return (
    <div className="news-card">
      <img
        className="news-image"
        src="https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain"
        alt="Hội nghị khách hàng 2024"
      />
      <div className="news-content">
        <h2 className="news-title">
          Công ty Cổ phần Sản xuất sơn Hà Nội tổ chức "Hội nghị khách hàng 2024"
        </h2>
        <p className="news-description">
          Ngày 06 tháng 01 năm 2024, Công ty cổ phần sản xuất sơn Hà Nội tổ chức sự kiện
          "Hội nghị khách hàng 2024", nhằm đẩy mạnh mối quan hệ hợp tác giữa công ty và
          nhà phân phối tại Việt Nam, tri ân các khách hàng và đại lý đã tin tưởng và hợp
          tác...
        </p>
        <div className="news-date">16/01/2024 · 01:28</div>
      </div>
    </div>
  );
};

export default PopularBlog;
