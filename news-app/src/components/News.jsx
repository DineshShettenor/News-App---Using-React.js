import { React, useState, useEffect } from "react";
import Image from "../assets/news_cover.jpg"
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";

function News(props) {

  let category = props.category;

  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);
  let [page, setPage] = useState(1);

  let resultNews = async () => {
    // const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=ecfaf9eaaa8d40a5b5d769210f5ee616`;
    const url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=a300939dfb7c4ba095518de130b2d751`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
  };

  useEffect(() => {
    resultNews();
  }, []);

  let fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${
      page + 1
    }&apiKey=a300939dfb7c4ba095518de130b2d751`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
  };

  return (
    <InfiniteScroll
      //This is important field to render the next data
      dataLength={articles.length}
      next={fetchData}
      hasMore={articles.length < totalResults}
      loader={<h4 className="text-center">Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="container my-3">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  sourceName={element.source.name}
                  title={element.title}
                  desc={element.description}
                  imageURL={element.urlToImage ? element.urlToImage : Image}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default News;
