import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Picture from './Picture';
import CircularProgress from '@material-ui/core/CircularProgress';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '70%',
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4rem',
    },
    pictureContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 33.33%)',
        gap: '20px',
        marginBottom: '4rem',
    },
});

const mainUrl = 'https://api.unsplash.com/photos/';
const searchUrl = 'https://api.unsplash.com/search/photos/';
const clientId = '?client_id=SaCaimlIk-Pz3HTknsBCVIBmeYCBSy4Wr4v32xwzxfE';
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

function App() {
    const classes = useStyles();
    const [data, setdata] = useState([]);
    const [page, setpage] = useState(0);
    const [isLoading, setisLoading] = useState(true);
    const [query, setquery] = useState('');

    useEffect(() => {
        setdata([]);
    }, [query]);

    useEffect(() => {
        fetchData();
    }, [page, query]);

    useEffect(() => {
        const event = window.addEventListener('scroll', () => {
            const d = document.documentElement;
            const offSet = d.scrollTop + window.innerHeight;
            const windowHeight = d.offsetHeight;

            if (offSet >= windowHeight) {
                setpage((oldPage) => {
                    return oldPage + 1;
                });
            }
        });

        return () => {
            window.removeEventListener('scroll', event);
        };
    }, []);

    const fetchData = async () => {
        let url;
        if (query) {
            url = `${searchUrl}${clientId}&page=${page}&query=${query}`;
        } else {
            url = `${mainUrl}${clientId}&page=${page}`;
        }

        try {
            const response = await fetch(url);
            const getData = await response.json();
            setdata((oldData) => {
                if (query) {
                    return [...oldData, ...getData.results];
                } else {
                    return [...new Set([...oldData, ...getData])];
                }
            });

            setisLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <form className={classes.form}>
                    <TextField
                        id='standard-basic'
                        label='Search Image'
                        value={query}
                        onChange={(e) => setquery(e.target.value)}
                    />
                </form>
                {isLoading ? (
                    <CircularProgress color='secondary' />
                ) : (
                    <div className={classes.pictureContainer}>
                        {data.map((cur) => (
                            <Picture key={uuid()} {...cur} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
