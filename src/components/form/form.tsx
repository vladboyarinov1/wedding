import {useFormik} from 'formik';
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
        validate: (values) => {
            const errors: Partial<FormValues> = {};

            if (!values.name) {
                errors.name = 'Обязательное поле';
            }
            if (!values.secondDay) {
                errors.secondDay = 'Обязательное поле';
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
                            {/*<TextField*/}
                            {/*    style={{width: '100%'}}*/}
                            {/*    variant="standard"*/}
                            {/*    className="form-control"*/}
                            {/*    id="name"*/}
                            {/*    placeholder="Иван Иванов, Мария Иванова"*/}
                            {/*    label="Имя и Фамилия гостей"*/}
                            {/*    type="text"*/}
                            {/*    {...formik.getFieldProps('name')}*/}
                            {/*/>*/}
                        </div>
                    </div>

                    {/*    <div style={{marginBottom: '25px'}}>*/}
                    {/*        <FormControl>*/}
                    {/*            {formik.touched.presence && formik.errors.presence && (*/}
                    {/*                <div className={s.errorText}>{formik.errors.presence}</div>*/}
                    {/*            )}*/}
                    {/*            <FormLabel style={{fontWeight: '500', color: 'black'}} id="presence-label">Планируете ли*/}
                    {/*                Вы присутствовать на*/}
                    {/*                свадьбе?</FormLabel>*/}
                    {/*            <RadioGroup*/}
                    {/*                aria-labelledby="presence-label"*/}
                    {/*                name="presence"*/}
                    {/*                value={formik.values.presence}*/}
                    {/*                onChange={formik.handleChange}*/}
                    {/*                onBlur={formik.handleBlur}*/}
                    {/*            >*/}
                    {/*                <FormControlLabel value="yes" control={<Radio color={'default'}/>}*/}
                    {/*                                  label="Да, с удовольствием!"/>*/}
                    {/*                <FormControlLabel value="no" control={<Radio color={'default'}/>}*/}
                    {/*                                  label="К сожалению, не могу"/>*/}
                    {/*            </RadioGroup>*/}
                    {/*        </FormControl>*/}
                    {/*    </div>*/}
                    {/*    /!*<FormControl style={{marginBottom: '25px'}}>*!/*/}
                    {/*    /!*    <FormLabel style={{fontWeight: '500', color: 'black'}} id="secondDay-label">Будете ли Вы на*!/*/}
                    {/*    /!*        втором дне? (начало в 12:00)</FormLabel>*!/*/}
                    {/*    /!*    <RadioGroup*!/*/}
                    {/*    /!*        aria-labelledby="secondDay-label"*!/*/}
                    {/*    /!*        name="secondDay"*!/*/}
                    {/*    /!*        value={formik.values.secondDay}*!/*/}
                    {/*    /!*        onChange={formik.handleChange}*!/*/}
                    {/*    /!*        onBlur={formik.handleBlur}*!/*/}
                    {/*    /!*    >*!/*/}
                    {/*    /!*        <FormControlLabel value="yes" control={<Radio color={'default'}/>} label="Да"/>*!/*/}
                    {/*    /!*        <FormControlLabel value="no" control={<Radio color={'default'}/>} label="Нет"/>*!/*/}
                    {/*    /!*    </RadioGroup>*!/*/}
                    {/*    /!*    {formik.touched.secondDay && formik.errors.secondDay && (*!/*/}
                    {/*    /!*        <div className={s.secondDay}>{formik.errors.secondDay}</div>*!/*/}
                    {/*    /!*    )}*!/*/}
                    {/*    /!*</FormControl>*!/*/}
                    {/*    /!*<div style={{marginBottom: '25px'}}>*!/*/}
                    {/*    /!*    {formik.touched.alcoholPreferences && formik.errors.alcoholPreferences && (*!/*/}
                    {/*    /!*        <div className={s.errorText}>{formik.errors.alcoholPreferences}</div>*!/*/}
                    {/*    /!*    )}*!/*/}
                    {/*    /!*    <FormControl component="fieldset">*!/*/}
                    {/*    /!*        <FormLabel style={{fontWeight: '500', color: 'black'}} component="legend">Что*!/*/}
                    {/*    /!*            предпочитаете из алкоголя?</FormLabel>*!/*/}
                    {/*    /!*        <FormGroup>*!/*/}
                    {/*    /!*            <FormControlLabel*!/*/}
                    {/*    /!*                control={<Checkbox color={'default'}/>}*!/*/}
                    {/*    /!*                label="Красное сухое вино"*!/*/}
                    {/*    /!*                value="Красное сухое вино"*!/*/}
                    {/*    /!*                onChange={(event: any) => {*!/*/}
                    {/*    /!*                    const isChecked = event.target.checked;*!/*/}
                    {/*    /!*                    if (typeof formik.values.alcoholPreferences !== 'string') {*!/*/}
                    {/*    /!*                        formik.setFieldValue(*!/*/}
                    {/*    /!*                            'alcoholPreferences',*!/*/}
                    {/*    /!*                            isChecked*!/*/}
                    {/*    /!*                                ? [...formik.values.alcoholPreferences, 'Красное сухое вино']*!/*/}
                    {/*    /!*                                : formik.values.alcoholPreferences.filter((preference) => preference !== 'Красное сухое вино')*!/*/}
                    {/*    /!*                        );*!/*/}
                    {/*    /!*                    }*!/*/}
                    {/*    /!*                }}*!/*/}
                    {/*    /!*            />*!/*/}
                    {/*    /!*            <FormControlLabel*!/*/}
                    {/*    /!*                control={<Checkbox color={'default'}/>}*!/*/}
                    {/*    /!*                label="Красное полусладкое вино"*!/*/}
                    {/*    /!*                value="Красное полусладкое вино"*!/*/}
                    {/*    /!*                onChange={(event: any) => {*!/*/}
                    {/*    /!*                    const isChecked = event.target.checked;*!/*/}
                    {/*    /!*                    if (typeof formik.values.alcoholPreferences !== 'string') {*!/*/}
                    {/*    /!*                        formik.setFieldValue(*!/*/}
                    {/*    /!*                            'alcoholPreferences',*!/*/}
                    {/*    /!*                            isChecked*!/*/}
                    {/*    /!*                                ? [...formik.values.alcoholPreferences, 'Красное полусладкое вино']*!/*/}
                    {/*    /!*                                : formik.values.alcoholPreferences.filter((preference) => preference !== 'Красное полусладкое вино')*!/*/}
                    {/*    /!*                        );*!/*/}
                    {/*    /!*                    }*!/*/}
                    {/*    /!*                }}*!/*/}
                    {/*    /!*            />*!/*/}
                    {/*    /!*            <FormControlLabel*!/*/}
                    {/*    /!*                control={<Checkbox color={'default'}/>}*!/*/}
                    {/*    /!*                label="Белое сухое вино"*!/*/}
                    {/*    /!*                value="Белое сухое вино"*!/*/}
                    {/*    /!*                onChange={(event: any) => {*!/*/}
                    {/*    /!*                    const isChecked = event.target.checked;*!/*/}
                    {/*    /!*                    if (typeof formik.values.alcoholPreferences !== 'string') {*!/*/}
                    {/*    /!*                        formik.setFieldValue(*!/*/}
                    {/*    /!*                            'alcoholPreferences',*!/*/}
                    {/*    /!*                            isChecked*!/*/}
                    {/*    /!*                                ? [...formik.values.alcoholPreferences, 'Белое сухое вино']*!/*/}
                    {/*    /!*                                : formik.values.alcoholPreferences.filter((preference) => preference !== 'Белое сухое вино')*!/*/}
                    {/*    /!*                        );*!/*/}
                    {/*    /!*                    }*!/*/}
                    {/*    /!*                }}*!/*/}
                    {/*    /!*            />*!/*/}
                    {/*    /!*            <FormControlLabel*!/*/}
                    {/*    /!*                control={<Checkbox color={'default'}/>}*!/*/}
                    {/*    /!*                label="Белое полусладкое вино"*!/*/}
                    {/*    /!*                value="Белое полусладкое вино"*!/*/}
                    {/*    /!*                onChange={(event: any) => {*!/*/}
                    {/*    /!*                    const isChecked = event.target.checked;*!/*/}
                    {/*    /!*                    if (typeof formik.values.alcoholPreferences !== 'string') {*!/*/}
                    {/*    /!*                        formik.setFieldValue(*!/*/}
                    {/*    /!*                            'alcoholPreferences',*!/*/}
                    {/*    /!*                            isChecked*!/*/}
                    {/*    /!*                                ? [...formik.values.alcoholPreferences, 'Белое полусладкое вино']*!/*/}
                    {/*    /!*                                : formik.values.alcoholPreferences.filter((preference) => preference !== 'Белое полусладкое вино')*!/*/}
                    {/*    /!*                        );*!/*/}
                    {/*    /!*                    }*!/*/}
                    {/*    /!*                }}*!/*/}
                    {/*    /!*            />*!/*/}
                    {/*    /!*            <FormControlLabel*!/*/}
                    {/*    /!*                control={<Checkbox color={'default'}/>}*!/*/}
                    {/*    /!*                label="Шампанское"*!/*/}
                    {/*    /!*                value="Шампанское"*!/*/}
                    {/*    /!*                onChange={(event: any) => {*!/*/}
                    {/*    /!*                    const isChecked = event.target.checked;*!/*/}
                    {/*    /!*                    if (typeof formik.values.alcoholPreferences !== 'string') {*!/*/}
                    {/*    /!*                        formik.setFieldValue(*!/*/}
                    {/*    /!*                            'alcoholPreferences',*!/*/}
                    {/*    /!*                            isChecked*!/*/}
                    {/*    /!*                                ? [...formik.values.alcoholPreferences, 'Шампанское']*!/*/}
                    {/*    /!*                                : formik.values.alcoholPreferences.filter((preference) => preference !== 'Шампанское')*!/*/}
                    {/*    /!*                        );*!/*/}
                    {/*    /!*                    }*!/*/}
                    {/*    /!*                }}*!/*/}
                    {/*    /!*            />*!/*/}
                    {/*    /!*            <FormControlLabel*!/*/}
                    {/*    /!*                control={<Checkbox color={'default'}/>}*!/*/}
                    {/*    /!*                label="Коньяк"*!/*/}
                    {/*    /!*                value="Коньяк"*!/*/}
                    {/*    /!*                onChange={(event: any) => {*!/*/}
                    {/*    /!*                    const isChecked = event.target.checked;*!/*/}
                    {/*    /!*                    if (typeof formik.values.alcoholPreferences !== 'string') {*!/*/}
                    {/*    /!*                        formik.setFieldValue(*!/*/}
                    {/*    /!*                            'alcoholPreferences',*!/*/}
                    {/*    /!*                            isChecked*!/*/}
                    {/*    /!*                                ? [...formik.values.alcoholPreferences, 'Коньяк']*!/*/}
                    {/*    /!*                                : formik.values.alcoholPreferences.filter((preference) => preference !== 'Коньяк')*!/*/}
                    {/*    /!*                        );*!/*/}
                    {/*    /!*                    }*!/*/}
                    {/*    /!*                }}*!/*/}
                    {/*    /!*            />*!/*/}
                    {/*    /!*            <FormControlLabel*!/*/}
                    {/*    /!*                control={<Checkbox color={'default'}/>}*!/*/}
                    {/*    /!*                label="Водка"*!/*/}
                    {/*    /!*                value="Водка"*!/*/}
                    {/*    /!*                onChange={(event: any) => {*!/*/}
                    {/*    /!*                    const isChecked = event.target.checked;*!/*/}
                    {/*    /!*                    if (typeof formik.values.alcoholPreferences !== 'string') {*!/*/}
                    {/*    /!*                        formik.setFieldValue(*!/*/}
                    {/*    /!*                            'alcoholPreferences',*!/*/}
                    {/*    /!*                            isChecked*!/*/}
                    {/*    /!*                                ? [...formik.values.alcoholPreferences, 'Водка']*!/*/}
                    {/*    /!*                                : formik.values.alcoholPreferences.filter((preference) => preference !== 'Водка')*!/*/}
                    {/*    /!*                        );*!/*/}
                    {/*    /!*                    }*!/*/}
                    {/*    /!*                }}*!/*/}
                    {/*    /!*            />*!/*/}
                    {/*    /!*            <FormControlLabel*!/*/}
                    {/*    /!*                control={<Checkbox color={'default'}/>}*!/*/}
                    {/*    /!*                label="Безалкогольные напитки"*!/*/}
                    {/*    /!*                value="Безалкогольные напитки"*!/*/}
                    {/*    /!*                onChange={(event: any) => {*!/*/}
                    {/*    /!*                    const isChecked = event.target.checked;*!/*/}
                    {/*    /!*                    if (typeof formik.values.alcoholPreferences !== 'string') {*!/*/}
                    {/*    /!*                        formik.setFieldValue(*!/*/}
                    {/*    /!*                            'alcoholPreferences',*!/*/}
                    {/*    /!*                            isChecked*!/*/}
                    {/*    /!*                                ? [...formik.values.alcoholPreferences, 'Безалкогольные напитки']*!/*/}
                    {/*    /!*                                : formik.values.alcoholPreferences.filter((preference) => preference !== 'Безалкогольные напитки')*!/*/}
                    {/*    /!*                        );*!/*/}
                    {/*    /!*                    }*!/*/}
                    {/*    /!*                }}*!/*/}
                    {/*    /!*            />*!/*/}
                    {/*    /!*        </FormGroup>*!/*/}
                    {/*    /!*    </FormControl>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*    /!*<div>*!/*/}
                    {/*    /!*    <TextField*!/*/}
                    {/*    /!*        style={{width: '100%'}}*!/*/}
                    {/*    /!*        variant="standard"*!/*/}
                    {/*    /!*        className="form-control"*!/*/}
                    {/*    /!*        id="music"*!/*/}
                    {/*    /!*        placeholder="Введите название любимого трека"*!/*/}
                    {/*    /!*        label="Оставьте свой любимый трек:"*!/*/}
                    {/*    /!*        type="text"*!/*/}
                    {/*    /!*        {...formik.getFieldProps('music')}*!/*/}
                    {/*    /!*        error={formik.touched.music && Boolean(formik.errors.music)}*!/*/}
                    {/*    /!*        helperText={formik.touched.music && formik.errors.music}*!/*/}
                    {/*    /!*    />*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*</div>*/}
                    <div>
                        <button className={s.button} type="submit">Отправить!</button>
                    </div>
                </form>
            </div>
        </div>
    );
};