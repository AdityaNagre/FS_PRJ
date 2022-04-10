import React, {useEffect,useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
    
  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [article, setarticle] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  document.title=`${capitalizeFirstLetter(props.category)} - NewsTODAY`;

  const fetchMoreData = async() => {
    props.setProgress(10)
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data= await fetch(url);
    props.setProgress(50)
    let parsedData= await data.json();
    props.setProgress(70)
    setarticle(article.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setloading(false)
    setpage(page+1)
    props.setProgress(100)
  };

  useEffect(() => {
    fetchMoreData();
  }, [])

    return <div>
        <>
          <div className="container">
          <h2 className='ms-4' style={{marginTop: '80px'}}>{props.headline}</h2>
          </div>
          {loading && <Spinner/>}
          <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length!==totalResults}
          loader={<Spinner/>}
          >
          <div className="container my-3">
          <div className="row">
          {article.map((element)=>{
            return <div className="col-md-4" key={element.url}> 
            <NewsItem author={element.source.name} publishDate={element.publishedAt} title={element.title} description={element.description?element.description:element.title} imageUrl={element.urlToImage?element.urlToImage:'https://a.c-dn.net/b/0Bhsft/headline_GettyImages-1159375409.jpg'} newsUrl={element.url}/>
              </div>
          })}
          </div>
          </div>
          </InfiniteScroll>
        </>
    </div>;

}
News.defaultProps={
  country:"in",
  pageSize: 12,
  category: 'general'
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News;
