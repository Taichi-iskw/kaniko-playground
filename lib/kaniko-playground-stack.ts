import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as iam from 'aws-cdk-lib/aws-iam';


export class KanikoPlaygroundStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', {
      maxAzs: 1,
      natGateways: 0,
    });

    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });

    const logGroup = new logs.LogGroup(this, 'KanikoLogs', {
      retention: logs.RetentionDays.ONE_DAY,
    });

    const taskRole = new iam.Role(this, 'KanikoTaskRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    taskRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryPowerUser')
    );

    const taskDef = new ecs.FargateTaskDefinition(this, 'TaskDef', {
      taskRole,
    });

    taskDef.addContainer('KanikoContainer', {
      image: ecs.ContainerImage.fromRegistry('gcr.io/kaniko-project/executor:latest'),
      entryPoint: ['/bin/sh', '-c'],
      command: ['sleep infinity'],
      logging: ecs.LogDriver.awsLogs({
        logGroup,
        streamPrefix: 'kaniko',
      }),
    });

    const service = new ecs.FargateService(this, 'Service', {
      cluster,
      taskDefinition: taskDef,
      desiredCount: 1,
      enableExecuteCommand: true,
      assignPublicIp: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });
  }
}
