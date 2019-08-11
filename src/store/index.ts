import { Rule, SchematicContext, Tree, url, apply, template, mergeWith } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

interface Schema {
  name: string;
  project?: string;
}

export function store(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const sourceTemplates = url('./files');

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
      })
    ]);

    return mergeWith(sourceParametrizedTemplates)(tree, _context);
  };
}
