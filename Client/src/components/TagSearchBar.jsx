import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useGetUsers } from '../lib/reactQuery/queriesAndMutations';

const TagSearchBar = () => {
    const [searchName, setSearchName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { data: users, isError, error, isSuccess } = useGetUsers(searchName);

    // const fetchAllUsers = async (searchName) => {
    //     try {
    //         const response = await getUsers(searchName);
    //         return
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const handleLoadOptions = async (inputValue) => {
        setSearchName(inputValue);
        console.log(inputValue);
        if (isSuccess) {
            console.log(users);
            return users;
        }
    }
    console.log(users);
    return (
        <AsyncSelect isMulti cacheOptions loadOptions={handleLoadOptions} />
    )
}

export default TagSearchBar