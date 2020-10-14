import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './preloader.scss';

function Preloader() {
    return (
        <div className="preloader">
            <CircularProgress />
            <br />
            <div>Загрузка данных</div>
        </div>
    );
}

export { Preloader };
