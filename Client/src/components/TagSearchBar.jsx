import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useGetUsers } from '../lib/reactQuery/queriesAndMutations';

const TagSearchBar = () => {
    const [searchName, setSearchName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    // const { mutateAsync: getUsers, isPending } = useGetUsers();

    const handleLoadOptions = (inputValue) => {
        setSearchName(inputValue);
        console.log(inputValue);
    }

    console.log(searchName);
    return (
        <AsyncSelect cacheOptions defaultOptions loadOptions={handleLoadOptions} />
    )
}

export default TagSearchBar