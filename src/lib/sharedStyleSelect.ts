export const getCustomSelectStyles = (hasError: boolean = false) => ({
    control: (provided: any, state: any) => ({
        ...provided,
        minHeight: '44px',
        borderColor: hasError ? '#ef4444' : state.isFocused ? '#0e7490' : provided.borderColor,
        boxShadow: state.isFocused ? (hasError ? '0 0 0 1px #ef4444' : '0 0 0 1px #0e7490') : provided.boxShadow,
        '&:hover': {
            borderColor: hasError ? '#ef4444' : state.isFocused ? '#0e7490' : provided.borderColor
        }
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#0e7490' : state.isFocused ? '#cffafe' : provided.backgroundColor,
        color: state.isSelected ? 'white' : provided.color,
    })
});