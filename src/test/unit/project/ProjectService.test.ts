import {describe, expect, test} from '@jest/globals';

import { Project } from "../../../domains/project/core/model/Project";
import { IProjectRepository } from "../../../domains/project/core/repository/IProjectRepository";
import { ProjectService } from "../../../domains/project/core/service/ProjectService";
import { IUserService } from "../../../domains/user/core/service/UserService";


describe('ProjectService', () => {
  let projectService: ProjectService;
  let projectRepository: jest.Mocked<IProjectRepository>;
  let userService: jest.Mocked<IUserService>;

  beforeEach(() => {
    projectRepository = {
      getById: jest.fn(),
      getAllByUser: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
      getAll: jest.fn(),
    } as jest.Mocked<IProjectRepository>;

    userService = {
      getById: jest.fn(),
      getAll: jest.fn(),
      getByIds: jest.fn(),
      register: jest.fn(),
      login: jest.fn(),
      refresh: jest.fn(),
      logout: jest.fn(),
    } as jest.Mocked<IUserService>;

    projectService = new ProjectService(projectRepository, userService);
  });

  it('should return a project by ID', async () => {
    const project = new Project('1', 'Test Project', 'Description', 'authorId', [], [], [], [], []);
    projectRepository.getById.mockResolvedValue(project);

    const result = await projectService.getById('1');
    expect(result).toEqual(project);
    expect(projectRepository.getById).toHaveBeenCalledWith('1');
  });

  it('should return null if project not found', async () => {
    projectRepository.getById.mockResolvedValue(null);

    const result = await projectService.getById('1');
    expect(result).toBeNull();
    expect(projectRepository.getById).toHaveBeenCalledWith('1');
  });

  it('should create a project', async () => {
    const project = new Project('1', 'New Project', 'Description', 'authorId', [], [], [], [], []);
    projectRepository.create.mockResolvedValue(project);
  
    const result = await projectService.create(project);
    expect(result).toEqual(project);
    expect(projectRepository.create).toHaveBeenCalledWith(project);
  });

  it('should validate a project and return no errors if valid', async () => {
    const project = new Project('1', 'Valid Project', 'Description', 'authorId', [], [], [], ['userId'], []);
    userService.getById.mockResolvedValue({ id: 'authorId', name: 'Author', email: 'test1@mail.ru', password: '1231' });
    userService.getByIds.mockResolvedValue([{ id: 'userId', name: 'User', email: 'test2@mail.ru', password: '1232' }]);
  
    const errors = await projectService.validate(project);
    expect(errors).toEqual([]);
    expect(userService.getById).toHaveBeenCalledWith('authorId');
    expect(userService.getByIds).toHaveBeenCalledWith(['userId']);
  });
  
  it('should return validation errors for invalid project', async () => {
    const project: any = { name: '1', description: '', authorId: 'userId2', users: [], epics: [], sprints: [], stages: [] };
    userService.getByIds.mockResolvedValue([{ id: 'userId1', name: 'User', email: 'test2@mail.ru', password: '1232' }]);
    const errors = await projectService.validate(project);
  
    expect(errors).toContain("Name length must be from 3 to 255 chars");
    expect(errors).toContain("Description length must be from 1 to 1024 chars");
    expect(errors).toContain("The listed author of the project does not exist");
  });  
});

