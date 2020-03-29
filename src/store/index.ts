import { Rule, SchematicContext, Tree, url, apply, template, mergeWith, move, Source } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { getDefaultPath } from '../_helpers/get-default-path.helper';


interface Schema {
  name: string;
  project?: string;
  path?: string;
}

export function store(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    options.path = options.path || getDefaultPath(tree, options) /* || process.cwd() */;
    const normalizedPath = normalize(options.path);

    const sourceParametrizedTemplates: Source = apply(url('./files'), [
      template({
        ...options,
        ...strings,
      }),
      move(normalizedPath),
    ]);

    return mergeWith(sourceParametrizedTemplates)(tree, context);
  };
}


