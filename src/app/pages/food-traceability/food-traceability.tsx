import React from 'react';
import { ProductionPlanDetail } from '../production-plan/production-plan-detail';
import { entityExample, exampleDetail } from './example-data';

function FoodTraceability({ id }: { id?: string }) {
  return (
    <>
      Trang chi tiết truy xuất nguồn gốc thực phẩm: {id ?? 'No info'}
      <div className="w-50 mx-auto">
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
