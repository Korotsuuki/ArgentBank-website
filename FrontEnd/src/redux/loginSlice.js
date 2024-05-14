/* Creation de la slice de connexion */

import { createSlice } from "@reduxjs/toolkit"

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        userToken: null,
        userProfil: null,
    },
    reducers: {
        /*Action pour connecter l'utilisateur */
        loginUser: (state, action) => {
            state.userToken = action.payload; /* Stocke les informations avec dispatch */
        },
        /* Action pour deconnecter l'utilisateur */
        logoutUser: (state) => {
            state.userToken = null; /* Remet a zéro les informations user */
            state.userProfil = null;
        },
        /*Action pour stocker les données utilisateur */
        infoUser: (state, action) => {
            state.userProfil = action.payload; /* Stocke les informations avec dispatch */
        },
        /* Action pour stocker les données utilisateur */
        infoUserName: (state, action) => {
            console.log("voici le payload info user Name:", action.payload);
            state.userProfil.userName = action.payload; /* Stocke les informations avec dispatch */
        },

    }
})


export const { loginUser, logoutUser, infoUser, infoUserName } =
    loginSlice.actions;

export default loginSlice;