import { IProjectService } from "../../../src/domains/project/core/service/ProjectService";
import { TaskFilter } from "../../../src/domains/task/core/model/TaskFilter";
import { TaskStatus } from "../../../src/domains/task/core/model/TaskStatus";
import { ITaskRepository } from "../../../src/domains/task/core/repository/ITaskRepository";
import { TaskService } from "../../../src/domains/task/core/service/TaskService";
import { IUserService } from "../../../src/domains/user/core/service/UserService";

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: jest.Mocked<ITaskRepository>;
  let userService: jest.Mocked<IUserService>;
  let projectService: jest.Mocked<IProjectService>;

  beforeEach(() => {
    taskRepository = {
      getAllByProject: jest.fn(),
      getById: jest.fn(),
      getAllByStatus: jest.fn(),
      getAllByDateFrom: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };

    userService = {
      register: jest.fn(),
      login: jest.fn(),
      refresh: jest.fn(),
      logout: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
      getByIds: jest.fn(),
    };

    projectService = {
      getById: jest.fn(),
      getAllByUser: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
      validate: jest.fn(),
    };

    taskService = new TaskService(taskRepository, userService, projectService);
  });

  describe('getAllByProject', () => {
    it('should return tasks by project filter', async () => {
      const filter: TaskFilter = { projectId: 'project1' };
      const tasks = [{ id: '1', name: 'Task 1', description: 'Task 1 description', status: TaskStatus.NotImportant, epicId: 'epic1', sprintId: 'sprint1', stageId: 'stage1', authorId: 'user1', executorId: 'user2', projectId: 'project1', creationDatetime: Date.now(), messages: null }];
      taskRepository.getAllByProject.mockResolvedValue(tasks);

      const result = await taskService.getAllByProject(filter);

      expect(result).toEqual(tasks);
      expect(taskRepository.getAllByProject).toHaveBeenCalledWith(filter);
    });
  });

  describe('getCriticalTasks', () => {
    it('should return critical tasks', async () => {
      const criticalTasks = [{ id: '1', name: 'Critical Task', description: 'Critical Task Description', status: TaskStatus.Critical, epicId: 'epic1', sprintId: 'sprint1', stageId: 'stage1', authorId: 'user1', executorId: 'user2', projectId: 'project1', creationDatetime: Date.now(), messages: null }];
      taskRepository.getAllByStatus.mockResolvedValue(criticalTasks);

      const result = await taskService.getCriticalTasks();

      expect(result).toEqual(criticalTasks);
      expect(taskRepository.getAllByStatus).toHaveBeenCalledWith(TaskStatus.Critical);
    });
  });

  describe('getTodayCreatedTasks', () => {
    it('should return tasks created today', async () => {
      const tasks = [{ id: '2', name: 'Task 2', description: 'Task 2 description', status: TaskStatus.NotImportant, epicId: 'epic1', sprintId: 'sprint1', stageId: 'stage1', authorId: 'user1', executorId: 'user2', projectId: 'project1', creationDatetime: Date.now(), messages: null }];
      taskRepository.getAllByDateFrom.mockResolvedValue(tasks);

      const result = await taskService.getTodayCreatedTasks();

      expect(result).toEqual(tasks);
      expect(taskRepository.getAllByDateFrom).toHaveBeenCalledWith(expect.any(Number)); // Check if called with a number
    });
  });

  describe('getById', () => {
    it('should return a task by ID', async () => {
      const task = { id: '1', name: 'Task 1', description: 'Task 1 description', status: TaskStatus.NotImportant, epicId: 'epic1', sprintId: 'sprint1', stageId: 'stage1', authorId: 'user1', executorId: 'user2', projectId: 'project1', creationDatetime: Date.now(), messages: null };
      taskRepository.getById.mockResolvedValue(task);

      const result = await taskService.getById('1');

      expect(result).toEqual(task);
      expect(taskRepository.getById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a task with current datetime', async () => {
      const newTask = { id: '1', name: 'New Task', description: 'New Task Description', creationDatetime: 123345, status: TaskStatus.NotImportant, epicId: 'epic1', sprintId: 'sprint1', stageId: 'stage1', authorId: 'user1', executorId: 'user2', projectId: 'project1', messages: null };
      const createdTask = { ...newTask, creationDatetime: expect.any(Number) }; // Check that creationDatetime is a number
      taskRepository.create.mockResolvedValue(createdTask);

      const result = await taskService.create(newTask);

      expect(result).toEqual(createdTask);
      expect(taskRepository.create).toHaveBeenCalledWith({ ...newTask, creationDatetime: expect.any(Number) });
    });
  });

  describe('update', () => {
    it('should update a task and return the updated task', async () => {
      const updatedTask = { id: '1', name: 'Updated Task', description: 'Updated Task Description', status: TaskStatus.Important, epicId: 'epic1', sprintId: 'sprint1', stageId: 'stage1', authorId: 'user1', executorId: 'user2', projectId: 'project1', creationDatetime: Date.now(), messages: null };
      taskRepository.update.mockResolvedValue(updatedTask);

      const result = await taskService.update(updatedTask);

      expect(result).toEqual(updatedTask);
      expect(taskRepository.update).toHaveBeenCalledWith(updatedTask);
    });
  });

  describe('deleteById', () => {
    it('should delete a task by ID', async () => {
      taskRepository.deleteById.mockResolvedValue(true);

      await taskService.deleteById('1');

      expect(taskRepository.deleteById).toHaveBeenCalledWith('1');
    });
  });

  describe('validate', () => {
    it('should validate a valid task', async () => {
      const task = {
        id: '1',
        name: 'Valid Task',
        description: 'A valid task description',
        status: TaskStatus.NotImportant,
        epicId: 'epic1',
        sprintId: 'sprint1',
        stageId: 'stage1',
        authorId: 'user1',
        executorId: 'user2',
        projectId: 'project1',
        creationDatetime: Date.now(),
        messages: null,
      };

      projectService.getById.mockResolvedValue({
        id: 'project1',
        name: 'Project 1',
        description: 'Project 1 description',
        authorId: 'user1',
        customFields: [],
        users: ['user1'],
        epics: [{ id: 'epic1', name: 'epic1' }],
        sprints: [{ id: 'sprint1', name: 'sprint1' }],
        stages: [{ id: 'stage1', name: 'stage1' }],
      });

      userService.getById.mockResolvedValue({ id: 'user1', email: 'email1', name: 'name1', password: ''});
      const errors = await taskService.validate(task);

      expect(errors).toHaveLength(0);
    });

    it('should return validation errors for an invalid task', async () => {
      const task = {
        id: '123',
        name: '',
        description: '',
        status: 'InvalidStatus',
        epicId: null,
        sprintId: 'nonExistentSprint',
        stageId: 'nonExistentStage',
        authorId: '',
        executorId: '',
        projectId: 'nonExistentProject',
        creationDatetime: null,
        messages: null,
      };

      projectService.getById.mockResolvedValue({
        id: 'project1',
        name: 'Project 1',
        description: 'Project 1 description',
        authorId: 'user1',
        customFields: [],
        users: ['user1'],
        epics: [{ id: 'epic1', name: 'epic1' }],
        sprints: [{ id: 'sprint1', name: 'sprint1' }],
        stages: [{ id: 'stage1', name: 'stage1' }],
      }); // Simulate non-existent project

      const errors = await taskService.validate(task);

      expect(errors).toContain("Name length must be from 3 to 255 chars");
      expect(errors).toContain("Description length must be from 1 to 1024 chars");
      expect(errors).toContain("Invalid task status");
      expect(errors).toContain("Required field epic is empty");
      expect(errors).toContain("The listed sprint do not exist in project");
      expect(errors).toContain("The listed author of the task does not exist");
      expect(errors).toContain("The listed executor of the task does not exist");
      expect(errors).toContain("Required field Creation datetime is empty");
    });
  });
});