import Newsitem from './Newsitem';
import React, {useState,useEffect} from 'react'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

const [articles,setArticles] = useState([]);
const [loading,setLoading] = useState(true);
const [page,setPage] = useState(1);
const [totalResults,setTotalResults] = useState(0);

const capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // constructor(props){
    //     super(props);
    //     console.log("helllo");
    //     this.state ={
    //         articles: [],
    //         loading: true,
    //         page:1,
    //         totalResults: 0
    //     }
    // }

const updateNews = async ()=>{
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
     
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json()
      console.log(parsedData); 
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResult);
      setLoading(false);
      props.setProgress(100);
    }

  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)}- CNBNews`;
    updateNews();
    //eslint-disable-next-line
  },[])

  // const handlePrevClick = async ()=>{
  //   // this.setState({page: this.state.page-1});
  //   setPage(page-1);
  //   updateNews();
  //   }

  // const handleNextClick = async ()=>{
  //     // this.setState({page: this.state.page+1});
  //   setPage(page+1);  
  //   updateNews();
  // }

const fetchMoreData = async () => {
    // this.setState({page: this.state.page + 1});
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pagesize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);

  //   this.setState({articles: articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults});
  };

    return (
      <>
        <h1 className="text-center mt-5 pt-5" style={{margin: "35px 0px"}}>CNBNews - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

        <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url} author={!element.author?"Unknown":element.author} date={element.publishedAt} source={element.source.name}/></div>
        
        })}
        </div>
        </div>
        </InfiniteScroll>
        </>
    )
  
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pagesize: PropTypes.number,
};

News.defaultProps = {
  country: "in",
  category: "general",
  pagesize: 8
}

export default News
