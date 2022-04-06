import React, {useState} from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {
  Paper,
  Typography,
  Box,
  Rating,
  TextField,
  FormControl,
  FormGroup,
  Button
} from "@mui/material";
import {FeedbackType} from "../../types";
import {getLocalStorageState, setLocalStorageState} from "../../localStorage";
import {v1} from 'uuid';
import {useDispatch} from "react-redux";
import {setFeedbackAC} from "../../store/reducers/feedback";

type FeedbackFormType = Omit<FeedbackType, "name">;

type fieldsArrayType = { id: string }[];

type FeedbackFormPropsType = {
  name: string;
  setOpenModal: (value: boolean) => void;
};

export const FeedbackForm = ({name, setOpenModal}: FeedbackFormPropsType) => {

  const dispatch = useDispatch()
  const [fields, setFields] = useState<fieldsArrayType>([]);

  const feedbacksFromLocalStorage = getLocalStorageState<FeedbackType[]>(
    "feedback",
    []
  );

  const {
    handleSubmit,
    control,
    formState: {errors, touchedFields}
  } = useForm<FeedbackFormType>({mode: "onTouched"});

  const onSubmit: SubmitHandler<FeedbackFormType> = (data) => {
    const dataToSend: FeedbackType[] = [
      ...feedbacksFromLocalStorage,
      {...data, name}
    ];
    setLocalStorageState("feedback", dataToSend);
    dispatch(setFeedbackAC(dataToSend))
    setOpenModal(false);
  };

  const handleCloseModalClick = () => {
    setOpenModal(false);
  };

  const handleCreateNewFieldClick = () => {
    const newId = v1()

    setFields([{id: newId}, ...fields])
  }

  const touched = Object.keys(touchedFields);
  const hasErrors = Object.keys(errors);

  return (
    <div>
      <Paper elevation={3} sx={{
        overflowY: 'scroll',
        maxHeight: '600px',
        "::-webkit-scrollbar": {display: "none", scrollbarWidth: 'none'}
      }}>
        <Box p={2} sx={{display: "flex", justifyContent: "center", width: 'auto'}}>
          <FormControl>

            {fields.map(({id}) => {
              return (
                <Box sx={{margin: "10px 0"}} key={id} id={id} data-testid='empty-input'>
                  <TextField margin="normal" type='text' />
                </Box>
              )
            })}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography>Name</Typography>
              <Typography variant={"h4"}>{name}</Typography>
              <FormGroup>
                <Box sx={{margin: "10px 0"}}>
                  <Controller
                    name="rating"
                    control={control}
                    defaultValue={3}
                    rules={{required: true}}
                    render={({field: {value, onChange, name, ref}}) => {
                      return (
                        <Rating
                          value={+value}
                          onChange={onChange}
                          name={name}
                          ref={ref}
                        />
                      );
                    }}
                  />
                </Box>

                <Box>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue={""}
                    rules={{
                      required: "Please enter your phone number",
                      minLength: {
                        value: 3,
                        message: "Min length 3 chars"
                      },
                      maxLength: {
                        value: 10,
                        message: "Max length 10 chars"
                      },
                      pattern: {
                        value: /^[0-9/+/ /(/)]+$/,
                        message: "Please enter a valid phone number"
                      }
                    }}
                    render={({field}) => {
                      return (
                        <TextField
                          required
                          margin="normal"
                          {...field}
                          label="phone"
                          helperText={errors.phone?.message}
                          error={!!errors.phone}
                        />
                      );
                    }}
                  />
                </Box>

                <Box sx={{margin: "10px 0"}}>
                  <Controller
                    name="comment"
                    control={control}
                    defaultValue={""}
                    rules={{required: true}}
                    render={({field}) => (
                      <TextField
                        {...field}
                        required
                        label="comment"
                        multiline
                        rows={4}
                      />
                    )}
                  />
                </Box>

                <Box sx={{margin: "10px 0"}}>
                  {touched.length >= 2 && hasErrors.length === 0 ? (
                    <Button type="submit" color={"success"} variant="outlined">
                      SAVE
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCloseModalClick}
                      color="error"
                      variant="outlined"
                    >
                      CANCEL
                    </Button>
                  )}
                  <Button color="success" variant="outlined" sx={{marginLeft: '5px'}}
                          onClick={handleCreateNewFieldClick}>
                    ADD NEW FIELD
                  </Button>
                </Box>
              </FormGroup>
            </form>
          </FormControl>
        </Box>
      </Paper>
    </div>
  );
};
