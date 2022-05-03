import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import { HostedZone } from 'aws-cdk-lib/aws-route53';

export class HackathlonDataStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "HackathlonVpc", {
      maxAzs: 1
    });

    const cluster = new ecs.Cluster(this, "HackathlonCluster", {
      vpc: vpc
    });

    const zone = HostedZone.fromLookup(this, 'DNSZone', {
      domainName: 'nitorio.us'
    })

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "HackathlonFargateService", {
      cluster: cluster,
      cpu: 512,
      desiredCount: 1,
      taskImageOptions: { image: ecs.ContainerImage.fromAsset('..') },
      memoryLimitMiB: 2048,
      publicLoadBalancer: true,
      domainName: 'hackathlon.' + zone.zoneName,
      domainZone: zone
    });
  }
}
