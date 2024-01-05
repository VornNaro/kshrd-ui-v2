import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function SkeletonAboutUsOurCourse() {

    let skeleton = Array(4).fill().map((item, index) => {
        return (
            <div className='ab-card' style={{ paddingBottom: '30px' }} data-aos="fade-up">
                <div className="row">
                    <div className="col-md-6 about-card-left">
                        <div className="card border-0 rounded-0 p-4 h-100 list-card d-flex flex-row align-content-center">
                            <div>
                                <Skeleton circle={true} width='100px' height="100px" />
                            </div>
                            <div className="ml-3">
                                <h5 className="list-title">
                                    <Skeleton width={400} />
                                </h5>
                                <p className="pt-2 m-0 title-des">
                                    <Skeleton width={400} count={2} />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 about-card-left">
                        <div className="card border-0 rounded-0 p-4 h-100 list-card d-flex flex-row align-content-center">
                            <div>
                                <Skeleton circle={true} width='100px' height="100px" />
                            </div>
                            <div className="ml-3">
                                <h5 className="list-title">
                                    <Skeleton width={400} />
                                </h5>
                                <p className="pt-2 m-0 title-des">
                                    <Skeleton width={400} count={2} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="row">
            {skeleton}
        </div>
    )
}