const errorsMessage = (error) => {
    return error.details.reduce((acc, curr) => ({
        ...acc,
        [curr.path]: curr.message
    }), {});
}

export default errorsMessage;