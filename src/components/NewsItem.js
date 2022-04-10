import React from 'react';

const NewsItem=(props)=> {
  const handleDate=(a)=>{
    let x=new Date(a);
    let t=new Date();
    let r=t.getHours()-x.getHours()
    return Math.abs(r)
  }
    return <div>
      <div className="container my-3">
        <div className="card">
            <img src={props.imageUrl} className="card-img-top" style={{height: 13+'rem'}} alt="..."/>
            <div className="card-body">
              <h5 className="card-title overflow-hidden" style={{height: 4.5+'rem'}}>{props.title}</h5>
              <p className="card-text overflow-hidden" style={{height: 4.5+'rem'}}>{props.description}</p>
              <span className="badge bg-danger">{props.author?props.author:"Anonymous"}</span>
              <p className="card-text"><small className="text-muted">{handleDate(props.publishDate)} hours ago</small></p>
              <a rel="noreferrer" href={props.newsUrl} target="_blank" className="btn btn-outline-primary btn-sm">Read More</a>
            </div>
        </div>
        </div>
    </div>;
}

export default NewsItem;


