#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { KanikoPlaygroundStack } from '../lib/kaniko-playground-stack';

const app = new cdk.App();
new KanikoPlaygroundStack(app, 'KanikoPlaygroundStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});