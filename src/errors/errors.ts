class NotFoundError extends Error {
    statusCode: number;
    constructor(message: string | undefined) {
      super(message);
      this.statusCode = 404;
    }
  }
  
  module.exports = NotFoundError; 

  class BAD_REQUEST extends Error {
    statusCode: number;
    constructor(message: string | undefined) {
      super(message);
      this.statusCode = 400;
    }
  }
  
  module.exports = BAD_REQUEST; 

  class INTERNAL_SERVER_ERROR extends Error {
    statusCode: number;
    constructor(message: string | undefined) {
      super(message);
      this.statusCode = 500;
    }
  }
  
  module.exports = INTERNAL_SERVER_ERROR; 