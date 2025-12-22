export const getCustomSelectStyles = (hasError: boolean = false) => ({
    control: (provided: any, state: any) => ({
        ...provided,
        minHeight: '44px',
        backgroundColor: 'var(--sidebar)',
        borderColor: hasError ? 'var(--destructive)' : state.isFocused ? 'var(--color-primary-500)' : 'var(--input)',
        boxShadow: state.isFocused ? (hasError ? '0 0 0 1px var(--destructive)' : '0 0 0 1px var(--color-primary-500)') : provided.boxShadow,
        '&:hover': {
            borderColor: hasError ? 'var(--destructive)' : state.isFocused ? 'var(--color-primary-500)' : 'var(--ring)'
        }
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: 'var(--popover)',
        border: '1px solid var(--border)',
        zIndex: 9999
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'var(--color-primary-500)' : state.isFocused ? 'var(--accent)' : 'transparent',
        color: state.isSelected ? 'white' : 'var(--foreground)',
        cursor: 'pointer',
        ':active': {
            backgroundColor: 'var(--color-primary-500)',
        }
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'var(--foreground)',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: 'var(--muted-foreground)',
    }),
    input: (provided: any) => ({
        ...provided,
        color: 'var(--foreground)',
    }),
});