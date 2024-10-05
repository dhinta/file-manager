import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSessionStorage from '../../../hooks/session-storage';
import { getInitials } from '../../../utils/common';
import styles from './login.module.css';

interface FormData {
    username: string;
    password: string;
}

const initialsSessionKey = 'loggedInUser';

export function Login(): JSX.Element {
    const loggedInUserStorage = useSessionStorage();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });
    const [hasError, setHasError] = useState(false);
    const [currentUserName, setCurrentUserName] = useState(
        loggedInUserStorage.get(initialsSessionKey)
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = () => setHasError(false);

        if (hasError) {
            inputRef.current?.addEventListener('animationend', handler);
        }

        return () => {
            inputRef.current?.removeEventListener('animationend', handler);
        };
    }, [hasError]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { username, password } = formData;

        if (username === '' || username.trim().length < 3) {
            setHasError(true);
            return;
        }

        if (!currentUserName && username.trim() !== '') {
            loggedInUserStorage.set(initialsSessionKey, username);
            setCurrentUserName(username.trim());
            return;
        }

        if (currentUserName && password === '') {
            setHasError(true);
            return;
        }

        navigate('/dashboard');
    };

    return (
        <div className={styles.login}>
            <div className={styles.userInput}>
                <div className={styles.loginBox}>
                    <div className="flex flex-col align-center">
                        <img
                            src="public/images/icon.png"
                            className={styles.profileIcon}
                        />
                        {currentUserName && (
                            <p className={styles.name}>
                                {getInitials(currentUserName)}
                            </p>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        {!currentUserName && (
                            <>
                                <input
                                    placeholder="Username"
                                    className={`${styles.formInput} ${hasError ? styles.error : ''}`}
                                    autoFocus
                                    ref={inputRef}
                                    value={formData.username}
                                    onChange={(event) =>
                                        setFormData((data) => ({
                                            ...data,
                                            username: event.target.value,
                                        }))
                                    }
                                />
                            </>
                        )}
                        {currentUserName && (
                            <input
                                type="password"
                                className={`${styles.formInput} ${hasError ? styles.error : ''}`}
                                autoFocus
                                placeholder="PIN"
                                ref={inputRef}
                                value={formData.password}
                                onChange={(event) =>
                                    setFormData((data) => ({
                                        ...data,
                                        password: event.target.value,
                                    }))
                                }
                            />
                        )}

                        <button type="submit" className="hidden"></button>
                    </form>
                    {/* <div className="text-white">
                        <p className={styles.forget}>I forgot my PIN!</p>
                        <p className={styles.options}>New here? Sign Up!</p>
                    </div> */}
                </div>
                <div className={styles.wrongPassword}>
                    <p>The PIN is incorrect. Try again.</p>
                    <div className={styles.okButtonBorder}>
                        <button className={styles.okButton}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
