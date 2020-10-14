import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

import { isNumber } from './utils/isNumber';
import { isEmpty } from './utils/IsEmpty';
import { useFetchWords } from './hooks/useFetchWords';
import { Preloader } from './components/preloader';
import { Color } from '@material-ui/lab';

function App() {
    const [control, setControl] = useState('');
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState('');
    const [alert, setAlert] = useState<{ status?: Color; message?: string }>({});
    const [open, setOpen] = useState(false);

    const { loading, data, error } = useFetchWords();

    if (loading) {
        return <Preloader />;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    const handleChangeControl = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setControl(value);
    };

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const searchByLength = () => {
        setResult('');

        const words = data.filter((word) => Number(control) < word.length);

        if (!words.length) {
            setAlert({
                status: 'info',
                message: 'Такой длинной строки нет.',
            });
            setOpen(true);
            return;
        }

        setResult(words.join(', '));
    };

    const searchBySubstring = () => {
        setResult('');

        const words = data.filter((word) =>
            checked
                ? word.includes(control.trim())
                : word.toLowerCase().includes(control.trim().toLowerCase()),
        );

        if (!words.length) {
            setAlert({ status: 'info', message: 'Такой подстроки не найдено.' });
            setOpen(true);
            return;
        }

        setResult(words.join(', '));
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <main className="main">
            <Container maxWidth="md">
                <div>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Введите данные для сортировки"
                        value={control}
                        onChange={handleChangeControl}
                    />
                </div>
                <br />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <FormControlLabel
                        value="end"
                        control={
                            <Checkbox
                                color="primary"
                                checked={checked}
                                onChange={handleChangeCheckbox}
                            />
                        }
                        label="Сравнить с учетом регистра"
                        labelPlacement="end"
                    />

                    <div>
                        <Button
                            style={{ marginRight: '20px' }}
                            variant="contained"
                            color="primary"
                            onClick={searchByLength}
                            disabled={isEmpty(control) || !isNumber(Number(control))}
                        >
                            Фильтр по длине слов
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={searchBySubstring}
                            disabled={isEmpty(control)}
                        >
                            Фильтр по подстроке
                        </Button>
                    </div>
                </div>

                <br />

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={alert.status}>
                        {alert.message}
                    </Alert>
                </Snackbar>

                <div>{result}</div>
            </Container>
        </main>
    );
}

export default App;
