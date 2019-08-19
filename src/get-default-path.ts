import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { SchematicsException } from "@angular-devkit/schematics";
import { experimental } from "@angular-devkit/core";

interface ProjectOptions {
  project?: string;
  path?: string;
}

export function getDefaultPath(tree: Tree, options: ProjectOptions): string {
  const workspaceConfig = tree.read('/angular.json');
  if (!workspaceConfig) {
    throw new SchematicsException('Could not find Angular workspace configuration');
  }

  // convert workspace to string
  const workspaceContent = workspaceConfig.toString();
  // parse workspace string into JSON object
  const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

  const project = workspace.projects[options.project as string];
  const projectType = project.projectType === 'application' ? 'app' : 'lib';

  return `${project.sourceRoot}/${projectType}`;
}