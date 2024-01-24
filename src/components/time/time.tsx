import {useEffect, useCallback, useState} from 'react';
import s from './time.module.css';

const getDays = (time: any) => Math.floor(time / (1000 * 60 * 60 * 24));
const getHours = (time: any) => Math.floor((time / (1000 * 60 * 60)) % 24);
const getMinutes = (time: any) => Math.floor((time / 1000 / 60) % 60);
const getSeconds = (time: any) => Math.floor((time / 1000) % 60);

const timeSuffix: any = {
    0: 'Дней',
    1: 'Часов',
    2: 'Минут',
    3: 'Секунд',
};

const Clock = ({deadline}: any) => {
    const [time, setTime] = useState([0, 0, 0, 0]);

    const leading0 = (num: any) => {
        return num < 10 ? '0' + num : num;
    };

    const getTimeUntil = useCallback((deadline: any) => {
        const time = new Date(deadline).getTime() - new Date().getTime();
        if (time < 0) {
            setTime([
                leading0(getDays(0)),
                leading0(getHours(0)),
                leading0(getMinutes(0)),
                leading0(getSeconds(0)),
            ]);
        } else {
            setTime([
                leading0(getDays(time)),
                leading0(getHours(time)),
                leading0(getMinutes(time)),
                leading0(getSeconds(time)),
            ]);
        }
    }, []);

    useEffect(() => {
        const timerRef = setInterval(() => getTimeUntil(deadline), 1000);

        return () => {
            clearInterval(timerRef);
            getTimeUntil(deadline);
        };
    }, [deadline, getTimeUntil]);

    return (
        <div className={s.wrapper}>
            <p>До мероприятия осталось:</p>
            <div className={s.clock_container}>
                {time.map((timeStamp, index) => {
                    return (
                        <div className={s.separator} key={Math.random()}>
                            <div className={s.number}> {timeStamp}</div>
                            <div className={s.subtitle}>{timeSuffix[index]}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Clock;