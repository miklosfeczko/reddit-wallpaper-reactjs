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
       
          <div className="songitems__box">
            <img
              className="songitems__box-img" 
              src={image.data.preview.images[0].resolutions[image.data.preview.images[0].resolutions.length -1].url.replace(/&amp;/g,"&")} 
              alt={image.data.title}/>
              <div className="songitems__text">
              <h5 className="songitems__title">
                 {image.data.title}
              </h5>
              <p className="songitems__subtitle"> <span>
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