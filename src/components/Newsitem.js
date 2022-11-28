import React from 'react'

const Newsitem = (props)=>{
    let {title,description,imageurl,newsurl,author,date,source} = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex', 
        justifyContent: 'flex-end',
        position: 'absolute',
        right:'0'}}>
        <span className="badge rounded-pill bg-danger">
        {source}
        </span>
        </div>
  <img src={!imageurl?"https://image.cnbcfm.com/api/v1/image/107091133-1658271343838-gettyimages-1241979688-NYSE_RECESSION.jpeg?v=1658271409&w=1920&h=1080":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsurl} target="blank" className="btn-sm btn-dark">Read more</a>
    <p className="card-text my-2"><small className="text-secondary">By Author {author} on {new Date(date).toGMTString()}</small></p>
  </div>
</div>
      </div>
    )
  }

export default Newsitem
