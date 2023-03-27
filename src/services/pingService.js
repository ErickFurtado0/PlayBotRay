class PingService {
    static async ping() {
      const start = Date.now();
  
      return new Promise((resolve) => {
        setTimeout(() => {
          const end = Date.now();
          resolve(end - start);
        }, 1);
      });
    }
  }
  
  module.exports = PingService;
  