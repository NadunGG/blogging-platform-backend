import * as dynamoose from 'dynamoose';
import { Schema } from 'dynamoose/dist/Schema';
import { TableOptionsOptional } from 'dynamoose/dist/Table';
import * as fs from 'fs';
import * as glob from 'glob-promise';
import * as yaml from 'js-yaml';
import * as path from 'path';

function toPascalCase(str: string): string {
  return str
    .replace(/_/g, ' ')
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    )
    .replace(/\s+/g, '');
}

const args = process.argv.slice(2);
const matchPattern = args[1];
const outputFile = args[2];

const deletionPolicy = 'Delete';
const globalOptions: TableOptionsOptional = {
  throughput: 'ON_DEMAND',
  prefix: '${self:service}-${self:provider.stage}-',
  suffix: '-table',
};

async function main() {
  if (!matchPattern || !outputFile) {
    console.log('missing required arguments.');
    return;
  }

  const slsResources: { Resources: Record<string, any> } = { Resources: {} };

  const files = await glob.promise(matchPattern);
  await Promise.all(
    files.map(async (file) => {
      console.log('detected:', file);

      const fileNameExt = file.split(/[\\\/]/).pop()!;
      const fileName = fileNameExt.split('.').shift()!;

      const tableName = toPascalCase(fileName);

      const exports = await import(`.${path.sep}${file}`);
      const schema = Object.values(exports).shift() as Schema;

      if (schema.constructor.name === 'Schema') {
        const model = dynamoose.model(fileName, schema, globalOptions);
        slsResources.Resources[`${tableName}Table`] = {
          Type: 'AWS::DynamoDB::Table',
          DeletionPolicy: deletionPolicy,
          Properties: await model.table().create({ return: 'request' }),
        };
      }
    }),
  );

  const yamlReources = yaml.dump(slsResources);
  const outputPath = outputFile.split(/[\\\/]/);
  if (outputPath.length > 1) {
    await fs.promises.mkdir(
      outputPath.slice(0, outputPath.length - 1).join(path.sep),
      { recursive: true },
    );
  }
  await fs.promises.writeFile(outputFile, yamlReources);
  console.log(`Serverless resources file generated at ${outputFile}`);
  process.exit(0);
}

main();
