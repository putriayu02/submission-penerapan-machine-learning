module.exports = {
    successResponse: (data) => ({
      status: 'success',
      message: 'Model is predicted successfully',
      data
    }),
  
    errorResponse: (message) => ({
      status: 'fail',
      message
    })
  };