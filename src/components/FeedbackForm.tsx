import React from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Paper, Typography, Box, Rating, TextField} from "@mui/material";

interface IFormInputs {
    name: string
    rating: number
    phone: string
    comment: string
}

type FeedbackFormPropsType = {
    name: string
}

export const FeedbackForm = ({name}: FeedbackFormPropsType) => {
    console.log("FORM RENDER")
    const {handleSubmit, control, formState: {errors}} = useForm<IFormInputs>();
    const onSubmit: SubmitHandler<IFormInputs> = data => console.log({...data, name});

    return (
        <Paper elevation={3}>
            <Box p={2} sx={{
                width: 300,

            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography>Name</Typography>
                    <Typography variant={"h4"}>{name}</Typography>

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

                    <Box >
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue={''}
                            // не знаю что это за номер длиной в максимум 10 символов, но вот
                            rules={{
                                required: true,
                                minLength: 3,
                                maxLength: 10,
                                pattern: /^[0-9/+/ /(/)]+$/
                            }}
                            render={({field}) => {
                                return <TextField
                                    margin="dense"
                                    {...field}
                                    label="phone"
                                    helperText={errors.phone && 'wrong number'}
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
                                label="comment"
                                multiline rows={4}/>}
                        />
                    </Box>

                    <Box>
                        <input type="submit" name='CANCEL'/>
                    </Box>
                </form>
            </Box>
        </Paper>
    );
}