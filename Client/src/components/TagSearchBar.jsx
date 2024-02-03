// import React, { useEffect, useState } from 'react';
// import AsyncSelect from 'react-select/async';
// import { useGetUsers } from '../lib/reactQuery/queriesAndMutations';

// const TagSearchBar = () => {
//     const [searchName, setSearchName] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const { data: users, isError, error, isSuccess } = useGetUsers(searchName);

//     const handleLoadOptions = (inputValue) => {
//         if (inputValue != searchName) {
//             setSearchName(prev => prev = inputValue);
//         }

//     }

//     useEffect(() => {
//         if (isSuccess) {
//             setSuggestions(prev => prev = (
//                 users.map(prev => ({
//                     ...prev,
//                     label: prev.username,
//                     value: prev._id,
//                 }))
//             ));
//             console.log(suggestions, "suggestions");
//         }
//     }, [isSuccess, users]);

//     return (
//         <AsyncSelect isMulti cacheOptions loadOptions={handleLoadOptions} defaultOptions/>
//     )
// }

// export default TagSearchBar



import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useGetUsers } from '../lib/reactQuery/queriesAndMutations';
import { useDebounce, useError } from '../hooks/customHooks';

const TagSearchBar = ({ name, placeholder, setTaggedUsers }) => {
    const { handleError, deleteError } = useError();
    const [searchName, setSearchName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { debouncedValue } = useDebounce(searchName, 300);
    
    const { data: users, isError, error, isSuccess } = useGetUsers(debouncedValue);

    const handleOptions = (inputValue) => {
        setSearchName(prev => prev = inputValue);
    }

    useEffect(() => {
        deleteError('apiError');
        if (isSuccess) {
            setSuggestions(prev => prev = (
                users.map(prev => ({
                    ...prev,
                    label: prev.username,
                    value: prev._id,
                }))
            ));
        }

        if (isError) {
            return handleError('apiError', { message: error?.response?.data?.message || error?.message });
        }
    }, [isSuccess, users, debouncedValue]);

    return (
        <>
            <Select
                isMulti
                name={name}
                options={suggestions}
                placeholder={placeholder}
                // defaultValue={selectedOption}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    fontSize: '20px',
                    colors: {
                        ...theme.colors,
                        primary: '#C3C3C3',
                    },
                })}
                onInputChange={(value) => handleOptions(value)}
                onChange={setTaggedUsers}
            />
        </>
    )
}

export default TagSearchBar

