import s from './App.module.css'
import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps';
import {Church} from './img/icons/components/church.tsx';
import {Wedding} from './img/icons/components/wedding.tsx';
import {Stemware} from './img/icons/components/stemware.tsx';
import {Restaurant} from './img/icons/components/restaurant.tsx';
import {Vp} from './img/icons/components/vp.tsx';
import {useWindowSize} from './hooks/use-window-size.ts';
import Clock from './components/time/time.tsx';



function App() {
    const {width} = useWindowSize()
    const mobile = width && width > 1000
    const targetDate = new Date('2024-05-11T23:27:20.116+00:00');
    return (
        <div className={s.container}>
            <div className={s.title}>
                <div><Vp width={mobile ? 490 : 290} height={mobile ? 546 : 346}/></div>
                <div className={s.name}>
                    <p>Вадим и Полина</p>
                </div>
            </div>
            <div className={s.content}>
                <div className={s.date}>
                    <div className={s.time}>11 - 05 - 2024</div>
                    <p>Один день в этом году будет для нас особенным, и мы хотим провести его
                        в кругу близких и друзей!
                        С большим удовольствием приглашаем вас на замечательный праздник -
                        нашу свадьбу!</p>
                </div>
                <div className={s.place}>
                    <div>Место проведения</div>
                    <p>Венчание будет проходить в Костеле Божьего Милосердия по адресу: г.Лида ул.Строителей д.33.
                        Церемония и последующий уютный вечер будет проходить по адресу г.Лида ул. Фомичева 1.</p>
                    <div className={s.map}>
                        <YMaps>
                            <Map width={'90%'} height={300}
                                 defaultState={{center: [53.91105351767865, 25.239165695359713], zoom: 12}}>
                                <Placemark geometry={[53.91105351767865, 25.239165695359713]}
                                           properties={{hintContent: 'Банкет'}}/>
                                <Placemark geometry={[53.922348640326426, 25.246485043961126]}
                                           properties={{hintContent: 'Венчание'}}/>
                            </Map>
                        </YMaps>
                    </div>
                </div>
                <div className={s.plan}>
                    <p>План Мероприятия</p>
                    <div className={s.planCards}>
                        <div className={s.card_item}>
                            <div className={s.circle}>
                                <div><Church/></div>
                            </div>
                            <p> 14:00 - Венчание</p>
                        </div>
                        <div className={s.card_item}>
                            <div className={s.circle}>
                                <div><Stemware/></div>
                            </div>
                            <p> 15:00 - Фуршет</p>
                        </div>
                        <div className={s.card_item}>
                            <div className={s.circle}>
                                <div><Wedding/></div>
                            </div>
                            <p> 16:00 - Выездная церемония</p>
                        </div>
                        <div className={s.card_item}>
                            <div className={s.circle}>
                                <div><Restaurant/></div>
                            </div>
                            <p> 17:00 - Банкет</p>
                        </div>
                    </div>
                </div>
                <div className={s.details}>
                    <div className={s.details_title}>Детали</div>
                    <div className={s.details_descr}>
                        <p>По всем вопросам, связанными с
                            торжественным вечером и сюрпризами,
                            обращаться к нашему ведущему -
                            Олегу.</p>
                        <a href="tel:+375295677829">+375295677829</a>
                    </div>
                </div>
                <div className={s.wishes}>
                    <div>Пожелания</div>
                    <p>Вместо традиционных цветов, мы бы хотели попросить вас поделиться с нами вашим любимым напитком
                        или настольной игрой, чтобы добавить к нашим воспоминаниям ещё больше веселья и вкусных
                        моментов.</p>
                </div>
                {/*<div className={s.form}>*/}
                {/*    <SendForm/>*/}
                {/*</div>*/}
            </div>
            <Clock deadline={targetDate}/>
        </div>
    )
}

export default App;