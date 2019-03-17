module.exports = function() {
  process.on("unhandledRException", ex => {
    console.log("unhandledRException: ", ex);
  });

  process.on("unhandledRejection", ex => {
    console.log("unhandledRejection: ", ex);
  });
};
