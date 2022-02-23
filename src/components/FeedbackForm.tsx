import React from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {
    Paper,
    Typography,
    Box,
    Rating,
    TextField,
    FormControl,
    FormGroup, Button
} from "@mui/material";
import {getLocalStorageState, setLocalStorageState} from "../localStorage";
import {FeedbackType} from "../types";


type FeedbackFormType = Omit<FeedbackType, 'name'>

type FeedbackFormPropsType = {
    name: string
    setOpenModal: (value: boolean) => void
}

export const FeedbackForm = ({name, setOpenModal}: FeedbackFormPropsType) => {
    const feedbacksFromLocalStorage = getLocalStorageState<FeedbackType[]>('feedback', [])

    const {
        handleSubmit,
        control,
        formState: {errors, touchedFields}
    } = useForm<FeedbackFormType>({mode: 'onTouched'});
    const onSubmit: SubmitHandler<FeedbackFormType> = data => {
        const dataToSend: FeedbackType[] = [...feedbacksFromLocalStorage, {...data, name}]
        setLocalStorageState('feedback', dataToSend)
        setOpenModal(false)
    };

    const handleCloseModalClick = () => {
        setOpenModal(false)
    }

    const touched = Object.keys(touchedFields)
    const hasErrors = Object.keys(errors)

    return (
        <Paper elevation={3}>
            <Box p={2} sx={{display: 'flex', justifyContent: 'center'}}>

                <FormControl>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography>Name</Typography>
                        <Typography variant={"h4"}>{name}</Typography>
                        <FormGroup>
                            <Box sx={{margin: '10px 0'}}>
                                <Controller
                                    name="rating"
                                    control={control}
                                    defaultValue={3}
                                    rules={{required: true}}
                                    render={({field: {value, onChange, name, ref}}) => {
                                        return <Rating
                                            value={+value}
                                            onChange={onChange}
                                            name={name}
                                            ref={ref}
                                        />
                                    }}
                                />
                            </Box>

                            <Box>
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue={''}
                                    // не знаю что это за номер длиной в максимум 10 символов, но вот
                                    rules={{
                                        required: "Please enter your phone number",
                                        minLength: {
                                            value: 3,
                                            message: 'Min length 3 chars',
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Max length 10 chars',
                                        },
                                        pattern: {
                                            value: /^[0-9/+/ /(/)]+$/,
                                            message: "Please enter a valid phone number"
                                        }
                                    }}
                                    render={({field}) => {
                                        return <TextField
                                            required
                                            margin="normal"
                                            {...field}
                                            label="phone"
                                            helperText={errors.phone?.message}
                                            error={!!errors.phone}
                                        />
                                    }}
                                />
                            </Box>

                            <Box sx={{margin: '10px 0'}}>
                                <Controller
                                    name="comment"
                                    control={control}
                                    defaultValue={''}
                                    rules={{required: true,}}
                                    render={({field}) => <TextField
                                        {...field}
                                        required
                                        label="comment"
                                        multiline rows={4}/>}
                                />
                            </Box>

                            <Box>
                                {touched.length >= 2 && hasErrors.length === 0 ?
                                    <Button
                                        type="submit"
                                        color={"success"}
                                        variant="outlined">
                                        SAVE
                                    </Button>
                                    :
                                    <Button
                                        onClick={handleCloseModalClick}
                                        color={"error"}
                                        variant="outlined">
                                        CANCEL
                                    </Button>
                                }
                            </Box>
                        </FormGroup>
                    </form>
                </FormControl>

            </Box>
        </Paper>
    );
}