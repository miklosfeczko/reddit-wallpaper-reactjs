import React from 'react';
import './ImageList.scss'

class ImageList extends React.Component {

render() {
  
  return ( 
  <div className="container">
    <div className="row">
    { this.props.images && this.props.images.map((image) => {
    
      if(image.data.preview) {
        if(image.data.preview.enabled) {
      
      return (
        <div key={image.data.id} className="col-xs-12 col-md-4 col-lg-4" style={{ marginBottom:"1rem"}}>
       
          <div className="image__box">
            <img 
              src={image.data.preview.images[0].resolutions[image.data.preview.images[0].resolutions.length -1].url.replace(/&amp;/g,"&")} 
              alt={image.data.title}/>
              <div className="imageitems__text">
              <a href={image.data.url} target="_blank" rel="noopener noreferrer">
              <h5 className="imageitems__title">
                 {image.data.title}
              </h5>
              </a>
              <p className="imageitems__subtitle"> <span>
                 Posted on r/{image.data.subreddit}
              </span></p>
              </div>
              <br/>            
          </div>
        </div>
      ); 
    }

    return <div key={image.data.id}>
    </div>
  }  return (
      <div key={image.data.id}></div>
    );
    } 
    ) 
    } 
    

    </div>
  </div>
  
  );

  }
}

export default ImageList;