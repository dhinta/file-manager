import styles from './date-time.module.css';

export function DateTime(): JSX.Element {
    return (
        <div className={styles.time}>
            <div className={styles.clock}>12:31</div>
            <div className={styles.date}>Wednesday, August 21</div>
        </div>
    );
}
