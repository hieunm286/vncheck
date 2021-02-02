import './style.scss'
import React from 'react'
import { Card, CardBody } from '../../common-library/card'
import { ToAbsoluteUrl } from '../../common-library/helpers/assets-helpers'

function HomePage() {
    return (
        <div className="home">
            <Card>
                <CardBody className="">
                    <div className="top-header d-flex justify-content-center aligns-align-items-center">
                        <h1 className="text-white font-weight-bolder">VnCheck - nền tảng Truy Xuất Nguồn Gốc số 1 Việt Nam</h1>
                    </div>
                    <div className="home__content">
                        <div className="home__content__image c-boder">
                            <img src={ToAbsoluteUrl('/media/homepage/desktop.png')} alt="" />
                        </div>
                        <div className="home__content__image c-boder">
                            <img src={ToAbsoluteUrl('/media/homepage/mfarm.png')} alt="" />
                        </div>
                        <div className="home__content__image">
                            <img src={ToAbsoluteUrl('/media/homepage/msale.png')} alt="" />

                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default HomePage
