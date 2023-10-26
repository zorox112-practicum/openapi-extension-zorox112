import React, {PropsWithChildren} from 'react';
import {yfmSandbox} from '../../plugin/constants';

export const Column: React.FC<
    PropsWithChildren & {
        className?: string;
        gap?: number;
    }
> = ({className, gap = 20, children}) => {
    const style = {
        gap: gap + 'px',
    };

    return (
        <div className={yfmSandbox('column', className)} style={style}>
            {children}
        </div>
    );
};
