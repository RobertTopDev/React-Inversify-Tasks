import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './symbols';
import { ITaskService } from '../domain/ports/ITaskService';
import { TaskService } from '../infra/memory/TaskService';
import { ConfigService } from '../infra/config/ConfigService';

const container = new Container({ defaultScope: 'Singleton' });

// Services
container.bind<ITaskService>(TYPES.TaskService).to(TaskService);
container.bind<ConfigService>(TYPES.ConfigService).to(ConfigService);

export { container };
