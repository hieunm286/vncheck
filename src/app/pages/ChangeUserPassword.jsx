import React, { useMemo } from 'react';
import { Card, CardHeader, CardHeaderToolbar } from '../../_metronic/_partials/controls';

export function ChangeUserPassword() {
  return (
    <div>
      {' '}
      <Card>
        <CardHeader title="Users list">
          <CardHeaderToolbar>
            <button type="button" className="btn btn-primary" onClick={() => {}}>
              New User
            </button>
          </CardHeaderToolbar>
        </CardHeader>
      </Card>
    </div>
  );
}
