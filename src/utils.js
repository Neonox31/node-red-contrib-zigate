module.exports = {
    toNodeError: (node) => (err, caught$) => {
        node.error(err);
        return caught$;
    }
};