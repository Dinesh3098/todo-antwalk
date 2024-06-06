const pingHandler = (req, res) => {
    res.json({ "msg": "pong" });
};

export { pingHandler };