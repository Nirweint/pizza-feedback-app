import React, {useEffect, useState} from 'react';
import {getLocalStorageState, setLocalStorageState} from "./localStorage";
import {api} from "./api";
import {createRequestTextForDiets} from "./utils";
import List from "@mui/material/List";
import {Grid, Typography} from "@mui/material";
import {GuestItem} from "./components/GuestItem";
import {GuestDietType, PartyGuestType} from "./types";

function App() {
    const guestsFromLocalStorage = getLocalStorageState<PartyGuestType[]>('guests', [])
    const dietFromLocalStorage = getLocalStorageState<GuestDietType[]>('diet', [])

    const [guests, setGuests] = useState<PartyGuestType[]>([])
    const [diet, setDiet] = useState<GuestDietType[]>([])

    const [openList, setOpenList] = React.useState<boolean>(true);

    const handleGuestsListClick = () => {
        setOpenList(!openList);
    };


    useEffect(() => {
        if (guestsFromLocalStorage.length === 0 || dietFromLocalStorage.length === 0) {
            api.getPartyGuests()
                .then(res => {
                    const guests = res.data.party;
                    setLocalStorageState('guests', guests)
                    setGuests(guests)
                    return guests
                })
                .then(res => {
                    api.checkGuestsDiet(createRequestTextForDiets(res))
                        .then(res => {
                            setLocalStorageState('diet', res.data.diet)
                            setDiet(res.data.diet)
                        })
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            setGuests(guestsFromLocalStorage)
            setDiet(dietFromLocalStorage)
        }
    }, [])

    return (
        <>
            <Grid container>
                <Grid item
                      sx={{width: '100%', maxWidth: 200, bgcolor: 'background.paper'}}
                >
                    <Typography>Guests list</Typography>
                    <List component="div" disablePadding>
                        {guests.map(({name, eatsPizza}, index) => {

                            const guestDiet = diet.find((guest) => guest.name === name)

                            return (
                                <GuestItem
                                    key={index}
                                    name={name}
                                    eatsPizza={eatsPizza}
                                    guestDiet={guestDiet}
                                    handleGuestsListClick={handleGuestsListClick}
                                />
                            )
                        })}
                    </List>
                </Grid>
            </Grid>
        </>
    )
}

export default App;
