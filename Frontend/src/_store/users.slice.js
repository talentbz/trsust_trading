import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

import { fetchWrapper } from '_helpers';

// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        users: {
            count: 0,
            rows: []
        },
        usersDetail: {},
        status: '',
    }
}

function createExtraActions() {
    const baseUrl = `${fetchWrapper.api_url}/api`;

    return {
        getAllUsers: getAllUsers(),
        getAll: getAll(),
        getUser: getUser(),
        updateUser: updateUser(),
        deleteUser: deleteUser()
    };    

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(baseUrl+'/users')
        );
    }

    function getAllUsers() {
        return createAsyncThunk(
            `${name}/getAllUsers`,
            async () => await fetchWrapper.get(baseUrl+'/users_detail')
        );
    }

    function getUser() {
        return createAsyncThunk(
            `${name}/getUser`,
            async (id) => await fetchWrapper.get(baseUrl+'/user/get')
        );
    }

    function updateUser() {
        // console.log('redux-update')
        return createAsyncThunk(
            `${name}/updateUser`,
            async (data) => await fetchWrapper.post(baseUrl+'/user/update', data)
        );
    }

    function deleteUser() {
        // console.log('redux-delete')
        return createAsyncThunk(
            `${name}/deleteUser`,
            async (id) => await fetchWrapper.delete(baseUrl+'/user/delete', {id:id})
        );
    }
}

function createExtraReducers() {
    return {
        ...getAllUsers(),
        ...getAll(),
        ...updateUser(),
        ...deleteUser()
    };

    function getAllUsers() {
        let { pending, fulfilled, rejected } = extraActions.getAllUsers;
        return {
            [pending]: (state) => {
                state.usersDetail = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.usersDetail = action.payload;
            },
            [rejected]: (state, action) => {
                state.usersDetail = { error: action.error };
            }
        };
    }

    function getAll() {
        let { fulfilled, rejected } = extraActions.getAll;
        return {
            [fulfilled]: (state, action) => {
                state.users = action.payload;
            },
            [rejected]: (state, action) => {
                state.status = action.error;
                state.users = { 
                    count: 0,
                    rows: 0
                 };
            }
        };
    }

    function updateUser() {
        let { fulfilled, rejected } = extraActions.updateUser;
        return {
            [fulfilled]: (state, action) => {
                state.status = 'success';
                state.usersDetail = {
                    ...state.usersDetail, 
                    count: action.payload.count,
                    rows: action.payload.rows,
                };
                Swal.fire('Success!', '', 'success');
            },
            [rejected]: (state, action) => {
                Swal.fire('Error', action.error.message??'unknown error', 'error')
            }
        };
    }

    function deleteUser() {
        let { fulfilled, rejected } = extraActions.deleteUser;
        return {
            [fulfilled]: (state, action) => {
                state.usersDetail = {
                    ...state.usersDetail, 
                    count: action.payload.count,
                    rows: action.payload.rows,
                };
                Swal.fire('Success!', '', 'success');
            },
            [rejected]: (state, action) => {
                Swal.fire('Error', action.error.message??'unknown error', 'error')
            }
        };
    }
}
