import React from 'react';
import { RootStateOrAny, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AuthPage } from '../auth';
import { ProductionPlanDetail } from '../production-plan/production-plan-detail';
import { entityExample, exampleDetail } from './example-data';

function FoodTraceability({ id }: { id?: string }) {

  const [renderInfo, setRenderInfo] = React.useState(exampleDetail)

  const { auth } = useSelector(
    ( state: RootStateOrAny) => ({ auth: state.auth }),
    shallowEqual,
  );

  React.useEffect(() => {
    const vData = [exampleDetail[0], exampleDetail[1], exampleDetail[2]]
    if (!auth?._id) {
      setRenderInfo(vData)
    }
  }, [auth])

  return (
    <>
      Trang chi tiết truy xuất nguồn gốc thực phẩm: {id ?? 'No info'}
      {auth?._id ? 'Đã đăng nhập' : 'Chưa đăng nhập'}
      <h4>{!auth?._id && 'Vui lòng đăng nhập để xem nhiều thông tin hơn' }</h4>

      <div className="w-md-75 w-lg-50 mx-auto">
        <ProductionPlanDetail
          entity={entityExample}
          renderInfo={renderInfo}
          showComment={false}
        />
      </div>
    </>
  );
}

export default FoodTraceability;
