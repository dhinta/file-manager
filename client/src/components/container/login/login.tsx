import { useRef, useState } from 'react';
import useSessionStorage from '../../../hooks/session-storage';
import { getInitials } from '../../../utils/common';
import styles from './login.module.css';

interface FormData {
    username: string;
    password: string;
}

const initialsSessionKey = 'loggedInUser';

export function Login(): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loggedInUserStorage = useSessionStorage();
    const loggedInUserName = getInitials(
        loggedInUserStorage.get(initialsSessionKey)
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const removeErrorClass = (elem: HTMLInputElement | null) => {
            setTimeout(() => elem?.classList.remove(styles.error), 500);
        };

        const { username, password } = formData;

        if (username === '') {
            userNameRef.current?.classList.add(styles.error);
            removeErrorClass(userNameRef.current);
            return;
        } else if (password === '') {
            passwordRef.current?.classList.add(styles.error);
            removeErrorClass(passwordRef.current);
            return;
        }

        loggedInUserStorage.set(initialsSessionKey, username);
    };

    return (
        <div className={styles.login}>
            <div className={styles.userInput}>
                <div className={styles.loginBox}>
                    <div
                        className={`flex flex-col align-center ${loggedInUserName ? '' : 'hidden'}`}
                    >
                        <img
                            className={styles.profileIcon}
                            src="public/images/icon.png"
                        />
                        <p className={styles.name}>{loggedInUserName}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <p
                            className={`${styles.name} ${loggedInUserName ? 'hidden' : ''}`}
                        >
                            Login
                        </p>
                        <input
                            placeholder="Username"
                            className={`${styles.formInput}  ${loggedInUserName ? 'hidden' : ''}`}
                            autoFocus
                            ref={userNameRef}
                            value={formData.username}
                            onChange={(event) =>
                                setFormData((data) => ({
                                    ...data,
                                    username: event.target.value,
                                }))
                            }
                        />
                        <input
                            type="password"
                            className={styles.formInput}
                            placeholder="PIN"
                            ref={passwordRef}
                            value={formData.password}
                            onChange={(event) =>
                                setFormData((data) => ({
                                    ...data,
                                    password: event.target.value,
                                }))
                            }
                        />

                        <button type="submit" className="hidden"></button>
                    </form>
                    <div className="text-white">
                        <p className={styles.forget}>I forgot my PIN!</p>
                        <p className={styles.options}>New here? Sign Up!</p>
                    </div>
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
