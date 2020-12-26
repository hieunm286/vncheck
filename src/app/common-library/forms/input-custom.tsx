import React, {ReactElement} from 'react';

export function InputCustom({
                              className, component
                            }: {
  className: string,
  component: () => ReactElement;
  
}) {
  const Component = component;
  return (<div className={className}>
    <Component/>
  </div>)
}

