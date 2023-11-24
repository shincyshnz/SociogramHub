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



import React, { useEffect, useRef, useState } from 'react';
import Select from "react-select";
import { useGetUsers } from '../lib/reactQuery/queriesAndMutations';
import { useError } from '../hooks/customHooks';

const TagSearchBar = () => {
    const { handleError, deleteError } = useError();
    const [searchName, setSearchName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const { data: users, isError, error, isSuccess, isPending } = useGetUsers(searchName);

    // useEffect(() => {
    //     if (isSuccess) {
    //         setSuggestions(prev => prev = (
    //             users.map(prev => ({
    //                 ...prev,
    //                 label: prev.username,
    //                 value: prev._id,
    //             }))
    //         ));
    //         console.log(suggestions, "suggestions");
    //     }
    // }, [isSuccess, users]);

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
    }, [isSuccess, users]);

    if (isError) {
        return handleError('apiError', { message: error?.response?.data?.message || error?.message });
    }

    return (
        <>
            <Select
                isMulti
                name="users"
                id="users"
                options={suggestions}
                defaultValue={selectedOption}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary: 'gray',
                    },
                })}
                onInputChange={(value) => handleOptions(value)}
                onChange={setSelectedOption}
            />
        </>
    )
}

export default TagSearchBar

