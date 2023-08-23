export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    height: 600,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
    bgcolor: 'rgba(39, 45, 53, 1)'
}

export const dividerStyle = {
    "&::before, &::after": {
        borderColor: "white",
    }
}

export const textFieldMargins = {
    marginBlock: 2,
    marginRight: 1,
    marginLeft: 1,
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(111,89,230,1)"
    },
    "& .MuiOutlinedInput-input": {
        color: "white"
    },
    "&:hover .MuiOutlinedInput-input": {
        color: "white"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white"
    },
    "& .MuiInputLabel-outlined": {
        color: "white"
    },
    "&:hover .MuiInputLabel-outlined": {
        color: "white"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
        color: "rgba(111,89,230,1)"
    }
}