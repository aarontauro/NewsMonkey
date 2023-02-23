import React, { Component } from 'react'
// import PropTypes from 'prop-types'

export class Newsitem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, time, source, mode} = this.props;

    return (
      <div>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt=''></img>
          <div className={`card-body text-${mode === 'dark' ? 'light' : 'dark'} bg-${mode}`}>
            <h5 className="card-title">{title} <span className="top-0 badge rounded-pill bg-danger" style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0'
            }}>
              {source} 
          </span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className={`text-muted-${mode === 'dark' ? 'light' : 'dark'}`}>Last updated by {!author ? 'Unknown' : author} on {new Date(time).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-primary btn-sm">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
