import React from 'react';

class PageNotFound extends React.Component{
    render(){
        const fontColor = '#9cdcda';
        const fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
        return(
          <div className="app-serviceTitleCt">
              <label className="app-serviceTitle app-serviceTitle-404">
                  Sorry. The page you were looking for does not exist.</label>
              <br/>
              <label style={{color: fontColor, fontFamily: fontFamily}}>
                  Please go back to the Home screen.</label>
          </div>
        );
    }
}

export default PageNotFound;