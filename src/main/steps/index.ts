import * as fs from 'fs';

import { Case } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent } from '../app/form/Form';

import { Step } from './constants';
import { edgecaseSequence } from './edge-case/edgecaseSequence';
import { EDGE_CASE_URL, USER_ROLE } from './urls';

/* Creating a new object called stepForms and assigning it to an empty object. */
const stepForms: Record<string, Form> = {};

/* Creating a new object called stepForms and assigning it to an empty object. */
[edgecaseSequence].forEach((sequence: Step[], i: number) => {
  const dir = __dirname + (i === 0 ? '/edge-case' : '');
  for (const step of sequence) {
    const stepContentFile = `${dir}${step.url}/content.ts`;
    if (fs.existsSync(stepContentFile)) {
      const content = require(stepContentFile);

      if (content.form) {
        stepForms[step.url] = new Form(content.form.fields);
      }
    }
  }
});

/**
 * It takes a request and a case object and returns the next step in the sequence
 * @param {AppRequest} req - AppRequest - this is the request object that is passed to the controller.
 * @param data - Partial<Case> - this is the data that is passed from the previous page.
 * @returns A string
 */
export const getNextStepUrl = (req: AppRequest, data: Partial<Case>): string => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((req.body as any).saveAsDraft) {
    return USER_ROLE;
  }
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = [...edgecaseSequence].find(s => s.url === path);
  const url = nextStep ? nextStep.getNextStep(data) : USER_ROLE;
  /* Returning the url and queryString variables. */
  return `${url}${queryString}`;
};

/**
 * It takes a request object and returns an object with a path and queryString property
 * @param {AppRequest} req - AppRequest - this is the request object that is passed to the middleware
 * function.
 * @returns { path: string; queryString: string }
 */
const getPathAndQueryString = (req: AppRequest): { path: string; queryString: string } => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  /* Returning an object with two properties: path and queryString. */
  return { path, queryString };
};

/**
 * It takes a step directory and returns an object with the content and view file paths
 * @param {string} stepDir - The directory of the step
 * @returns An object with two properties: content and view.
 */
const getStepFiles = (stepDir: string) => {
  const stepContentFile = `${stepDir}/content.ts`;
  const content = fs.existsSync(stepContentFile) ? require(stepContentFile) : {};
  const stepViewFile = `${stepDir}/template.njk`;
  const view = fs.existsSync(stepViewFile) ? stepViewFile : `${stepDir}/../../common/template.njk`;

  /* Returning an object with two properties: content and view. */
  return { content, view };
};

export type StepWithContent = Step & {
  stepDir: string;
  generateContent: TranslationFn;
  form: FormContent;
  view: string;
};

/**
 * It takes a sequence of steps and returns a sequence of steps with content
 * @param {Step[]} sequence - Step[] - the sequence of steps to get the content for
 * @param [subDir] - The subdirectory of the current directory to look for the step files.
 * @returns An array of objects with the following properties:
 *   - stepDir: the directory of the step
 *   - step: the step object
 *   - content: the content object
 *   - view: the view object
 */
const getStepsWithContent = (sequence: Step[], subDir = ''): StepWithContent[] => {
  const dir = __dirname;

  const results: StepWithContent[] = [];
  for (const step of sequence) {
    const stepDir = `${dir}${step.url.startsWith(subDir) ? step.url : `${subDir}${step.url}`}`;
    const { content, view } = getStepFiles(stepDir);
    results.push({ stepDir, ...step, ...content, view });
  }
  /* Returning the results array. */
  return results;
};

/* Exporting the stepsWithContentEdgecase variable. */
export const stepsWithContentEdgecase = getStepsWithContent(edgecaseSequence, EDGE_CASE_URL);

export const stepsWithContent = [...stepsWithContentEdgecase];
