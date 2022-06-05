import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
import Controller from './interfaces/controller.interface';
 
class App {
  public app: express.Application;
 
  constructor(private controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.static(__dirname + '/uploads'));
  }
 
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}
 
export default App;