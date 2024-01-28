import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Blogs() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);

  useEffect(() => {
    const FetchAllBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/blogs");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    FetchAllBlogs();
  }, []);

  const viewsFormat = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "m views";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "k views";
    }
    return views + "views";
  };

  const formatPublishDate = (publishDate) => {
    const currentDate = new Date();
    const postDate = new Date(publishDate);
    const timeDifference = currentDate - postDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(monthsDifference / 12);

    if (yearsDifference > 0) {
      return `posted ${yearsDifference} ${
        yearsDifference === 1 ? "year" : "years"
      } ago`;
    } else if (monthsDifference > 0) {
      return `posted ${monthsDifference} ${
        monthsDifference === 1 ? "month" : "months"
      } ago`;
    } else if (daysDifference > 0) {
      return `posted ${daysDifference} ${
        daysDifference === 1 ? "day" : "days"
      } ago`;
    } else if (hoursDifference > 0) {
      return `posted ${hoursDifference} ${
        hoursDifference === 1 ? "hour" : "hours"
      } ago`;
    } else if (minutesDifference > 0) {
      return `posted ${minutesDifference} ${
        minutesDifference === 1 ? "minute" : "minutes"
      } ago`;
    } else {
      return `posted a few seconds ago`;
    }
  };
  return (
    <section className="blogs">
      <div className="container-fluid blogs__body">
        <div className="row ">
          {data.map((blogs) => {
            const imagePath = `../Assets/BlogImages/${blogs.blog_img}`;
            return (
              <div key={blogs.blog_id} className="col-lg-6 blogs__item">
                <div className="blogs__img-box mb-4">
                  <img src={imagePath} alt="" className="blogs__img" />
                </div>

                <Link to="/shop" className="blogs__title">
                  {blogs.blog_title}
                </Link>

                <div className="d-flex alin-items-center justify-content-between mt-auto">
                  <span className="blogs__misc blogs__views">
                    {viewsFormat(blogs.blog_views)}
                  </span>
                  <span className="blogs__misc blogs__date">
                    {formatPublishDate(blogs.blog_publishDate)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row mt-5">
          <div className="d-flex justify-content-center align-items-center">
            <Link className="btn-oval blogs__link" to="/shop">
              All Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
