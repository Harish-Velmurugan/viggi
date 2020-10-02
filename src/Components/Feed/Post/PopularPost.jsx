import React from 'react'


class PopularPost extends React.Component{
    render(){
        return(
          <div>
            <div className="card card-body pb-0">
              <div className="single-post">
                <p className="text-white text-center bg-primary">
                  <strong>POPULAR POSTS</strong>
                </p>
                {/* Grid row */}
                <div className="row mb-4">
                  <div className="col-5">
                    {/* Image */}
                    <div className="view">
                      <img src="https://mdbootstrap.com/img/Photos/Others/photo13.jpg" className="img-fluid rounded-circle" alt="sample image" data-holder-rendered="true" />
                      <a>
                        <div className="mask rgba-white-slight" />
                      </a>
                    </div>
                  </div>
                  {/* Excerpt */}
                  <div className="col-7">
                    <h6 className="mt-0">
                      <a href="#" style={{fontSize: '15px'}}>
                        <p className="text-dark">Target Delivery and Screening of Lipid Nanoparticles</p>
                      </a>
                    </h6>
                    <div className="post-data">
                      <p className="text-grey mb-0">
                        <i className="far fa-clock-o" /> 2 days ago</p>
                    </div>
                  </div>
                  {/*  Excerpt */}
                </div>
                {/*  Grid row */}
              </div>
              <div className="single-post">
                {/* Grid row */}
                <div className="row mb-4">
                  <div className="col-5">
                    {/* Image */}
                    <div className="view">
                      <img src="https://mdbootstrap.com/img/Photos/Others/photo12.jpg" className="img-fluid rounded-circle" alt="sample image" />
                      <a>
                        <div className="mask rgba-white-slight" />
                      </a>
                    </div>
                  </div>
                  {/* Excerpt */}
                  <div className="col-7">
                    <h6 className="mt-0">
                      <a href="#" style={{fontSize: '15px'}}>
                        <p className="text-dark">Rapid Detection of Intermolecular interactions</p>
                      </a>
                    </h6>
                    <div className="post-data">
                      <p className="text-grey mb-0">
                        <i className="far fa-clock-o" /> 5 days ago</p>
                    </div>
                  </div>
                  {/*  Excerpt */}
                </div>
                {/*  Grid row */}
              </div>
              <div className="single-post">
                {/* Grid row */}
                <div className="row mb-4">
                  <div className="col-5">
                    {/* Image */}
                    <div className="view">
                      <img src="https://mdbootstrap.com/img/Photos/Others/photo10.jpg" className="img-fluid rounded-circle" alt="sample image" />
                      <a>
                        <div className="mask rgba-white-slight" />
                      </a>
                    </div>
                  </div>
                  {/* Excerpt */}
                  <div className="col-7">
                    <h6 className="mt-0 font-small">
                      <a href="#" style={{fontSize: '15px'}}>
                      <p className="text-dark">Novel Methods for Viral Strains in Cell culture</p>
                      </a>
                    </h6>
                    <div className="post-data">
                      <p className="font-small grey-text mb-0">
                        <i className="far fa-clock-o" /> 6 days ago</p>
                    </div>
                  </div>
                  {/*  Excerpt */}
                </div>
                {/*  Grid row */}
              </div>
              <div className="single-post">
                {/* Grid row */}
                <div className="row mb-4">
                  <div className="col-5">
                    {/* Image */}
                    <div className="view">
                      <img src="https://mdbootstrap.com/img/Photos/Others/photo15.jpg" className="img-fluid rounded-circle" alt="sample image" />
                      <a>
                        <div className="mask rgba-white-slight" />
                      </a>
                    </div>
                  </div>
                  {/* Excerpt */}
                  <div className="col-7">
                    <h6 className="mt-0 font-small">
                      <a href="#" style={{fontSize: '15px'}}>
                      <p className="text-dark">Diminishing the Transmission of COVID-19</p>
                      </a>
                    </h6>
                    <div className="post-data">
                      <p className="font-small grey-text mb-0">
                        <i className="far fa-clock-o" /> 7 days ago</p>
                    </div>
                  </div>
                  {/*  Excerpt */}
                </div>
                {/*  Grid row */}
              </div>
              <div className="single-post">
                {/* Grid row */}
                <div className="row mb-4">
                  <div className="col-5">
                    {/* Image */}
                    <div className="view">
                      <img src="https://mdbootstrap.com/img/Photos/Others/photo9.jpg" className="img-fluid rounded-circle" alt="sample image" />
                      <a>
                        <div className="mask rgba-white-slight" />
                      </a>
                    </div>
                  </div>
                  {/* Excerpt */}
                  <div className="col-7">
                    <h6 className="mt-0 font-small">
                      <a href="#" style={{fontSize: '15px'}}>
                      <p className="text-dark">Improving Thermal Stability of Proteins</p>
                      </a>
                    </h6>
                    <div className="post-data">
                      <p className="font-small grey-text mb-0">
                        <i className="far fa-clock-o" /> 8 days ago</p>
                    </div>
                  </div>
                  {/*  Excerpt */}
                </div>
                {/*  Grid row */}
              </div>
            </div>
            </div>
        )
    }
}

export default PopularPost;