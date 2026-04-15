const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl,
        data: Date()
    });
};
export default notFound;
//# sourceMappingURL=notFound.js.map