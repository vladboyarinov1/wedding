import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import {useFormik} from 'formik';
import {SuccessfulSnackbar} from '../successful-snackbar/successful-snackbar.tsx';
import s from './form.module.scss';
import axios from 'axios';

interface FormValues {
    name: string;
    presence: string | null;
    alcoholPreferences: string[] | string;
    secondDay: string | null;
    music: string;
}


export const SendForm = () => {
    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            presence: null,
            alcoholPreferences: [],
            secondDay: null,
            music: ''
        },
        onSubmit: (values: any) => {
            sendEmail(values)
        },
        validate: values => {
            const errors: Partial<FormValues> = {};

            if (!values.name) {
                errors.name = 'Обязательное поле';
            }
            if (!values.secondDay) {
                errors.name = 'Обязательное поле';
            }
            if (!values.presence) {
                errors.presence = 'Обязательное поле';
            }
            if (values.alcoholPreferences.length === 0) {
                errors.alcoholPreferences = 'Обязательное поле';
            }

            return errors;
        },
    });

    async function sendEmail(values: FormValues) {
        // setLoading(true)
        const chatId = '-4185811054';
        const parseMode = 'Markdown';
        const message = `
   🎉 *Информация о гостях* 🎉
   Имена гостей: *${values.name}*,
   💃 *Присутствие на свадьбе*: *${values.presence === 'yes' ? 'Да' : 'Нет'}*,
   📅 *Второй день*: *${values.secondDay === 'yes' ? 'Да' : 'Нет'}*,
   🍷 *Алкоголь*: *${values.alcoholPreferences}*,
   🎵 *Музыка*: *${values.music ?? 'Не указано'}*
   `
        try {
            const res = await axios.get(`https://api.telegram.org/bot6708801756:AAGbODKCspD-QUFJ9EVWjmwNfIBIRoNSpf0/sendMessage`, {
                params: {
                    chat_id: chatId,
                    parse_mode: parseMode,
                    text: message
                }
            })
            if (res.status) {
                console.log('ok')
            } else {
                console.log('ne ok')
            }
        } catch (e) {
            console.log('ne ok 2')
        }
    }

    return (
        <div className={s.wrapper} id="form">
            <SuccessfulSnackbar
                isOpen={formik.status?.sent}
                message="lalal"
                setStatus={formik.setStatus}
            />
            <div className={s.formContainer}>
                <div className={s.title}>
                    <div>Пожалуйста, чтобы всё прошло идеально, ответьте на несколько вопросов в анкете:</div>
                    <p>Просьба заполнить данную анкету до 22.04.2024</p>
                </div>

                <form encType="multipart/form-data" method="POST" onSubmit={formik.handleSubmit}>
                    <div className={s.nameFormBlock}>
                        <div style={{marginBottom: '25px'}}>
                            {formik.touched.name && formik.errors.name && (
                                <div className={s.errorText}>{formik.errors.name}</div>
                            )}
                            <TextField
                                style={{width: '100%'}}
                                variant="standard"
                                className="form-control"
                                id="name"
                                placeholder="Иван Иванов, Мария Иванова"
                                label="Имя и Фамилия гостей"
                                type="text"
                                {...formik.getFieldProps('name')}
                            />
                        </div>
                        <div style={{marginBottom: '25px'}}>
                            <FormControl>
                                {formik.touched.presence && formik.errors.presence && (
                                    <div className={s.errorText}>{formik.errors.presence}</div>
                                )}
                                <FormLabel style={{fontWeight: '500', color: 'black'}} id="presence-label">Планируете ли
                                    Вы присутствовать на
                                    свадьбе?</FormLabel>
                                <RadioGroup
                                    aria-labelledby="presence-label"
                                    name="presence"
                                    value={formik.values.presence}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <FormControlLabel value="yes" control={<Radio color={'default'}/>}
                                                      label="Да, с удовольствием!"/>
                                    <FormControlLabel value="no" control={<Radio color={'default'}/>}
                                                      label="К сожалению, не могу"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <FormControl style={{marginBottom: '25px'}}>
                            <FormLabel style={{fontWeight: '500', color: 'black'}} id="secondDay-label">Будете ли Вы на
                                втором дне? (начало в 12:00)</FormLabel>
                            <RadioGroup
                                aria-labelledby="secondDay-label"
                                name="secondDay"
                                value={formik.values.secondDay}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <FormControlLabel value="yes" control={<Radio color={'default'}/>} label="Да"/>
                                <FormControlLabel value="no" control={<Radio color={'default'}/>} label="Нет"/>
                            </RadioGroup>
                            {formik.touched.secondDay && formik.errors.secondDay && (
                                <div className={s.secondDay}>{formik.errors.secondDay}</div>
                            )}
                        </FormControl>
                        <div style={{marginBottom: '25px'}}>
                            {formik.touched.alcoholPreferences && formik.errors.alcoholPreferences && (
                                <div className={s.errorText}>{formik.errors.alcoholPreferences}</div>
                            )}
                            <FormControl component="fieldset">
                                <FormLabel style={{fontWeight: '500', color: 'black'}} component="legend">Что
                                    предпочитаете из алкоголя?</FormLabel>
                                <FormGroup>
                                    {['Красное сухое вино', 'Красное полусладкое вино', 'Белое сухое вино', 'Белое полусладкое вино', 'Шампанское', 'Коньяк', 'Водка', 'Безалкогольные напитки'].map((preference) => (
                                        <FormControlLabel
                                            key={preference}
                                            control={<Checkbox color={'default'} />}
                                            label={preference}
                                            checked={Array.isArray(formik.values.alcoholPreferences)
                                                ? formik.values.alcoholPreferences.includes(preference)
                                                : formik.values.alcoholPreferences === preference}
                                            onChange={(event: any) => {
                                                const isChecked = event.target.checked;
                                                formik.setFieldValue(
                                                    'alcoholPreferences',
                                                    Array.isArray(formik.values.alcoholPreferences)
                                                        ? isChecked
                                                            ? [...formik.values.alcoholPreferences, preference]
                                                            : formik.values.alcoholPreferences.filter((value) => value !== preference)
                                                        : isChecked ? [preference] : ''
                                                );
                                            }}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>

                        </div>
                        <div>
                            <TextField
                                style={{width: '100%'}}
                                variant="standard"
                                className="form-control"
                                id="music"
                                placeholder="Введите название любимого трека"
                                label="Оставьте свой любимый трек:"
                                type="text"
                                {...formik.getFieldProps('music')}
                                error={formik.touched.music && Boolean(formik.errors.music)}
                                helperText={formik.touched.music && formik.errors.music}
                            />
                        </div>
                    </div>
                    <div >
                        <button className={s.button} type="submit">Отправить!</button>
                    </div>
                </form>
            </div>
        </div>
    );
};