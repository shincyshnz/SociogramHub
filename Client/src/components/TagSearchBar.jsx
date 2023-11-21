import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useGetUsers } from '../lib/reactQuery/queriesAndMutations';
import { useDebounce } from '../hooks/customHooks';

const TagSearchBar = () => {
    const [searchUserName, setSearchUserName] = useState("");
    const [users, setUsers] = useState([]);
    // const { mutateAsync: getUsers, isPending } = useGetUsers();

    const handleLoadOptions = (inputValue) => {
        setSearchUserName(inputValue);
        console.log(inputValue);
    }

    console.log(users);
    return (
        <AsyncSelect cacheOptions defaultOptions loadOptions={handleLoadOptions} />
    )
}

export default TagSearchBar