import React from 'react';
import { ProductionPlanDetail } from '../production-plan/production-plan-detail';
import { entityExample, exampleDetail } from './example-data';

function FoodTraceability({ id }: { id?: string }) {
  return (
    <>
      Trang chi tiết truy xuất nguồn gốc thực phẩm: {id ?? 'No info'}
      <div className="w-md-75 w-lg-50 mx-auto">
        <ProductionPlanDetail
          entity={entityExample}
          renderInfo={exampleDetail}
          showComment={false}
        />
      </div>
    </>
  );
}

export default FoodTraceability;
