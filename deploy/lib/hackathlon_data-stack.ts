import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export class HackathlonDataStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, "NitorVpc", {
      vpcId: 'vpc-18697c7a'
    });

    const cluster = new ecs.Cluster(this, "HackathlonCluster", {
      vpc: vpc
    });

    const zone = HostedZone.fromLookup(this, 'NitorDNSZone', {
      domainName: 'nitorio.us'
    })

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "HackathlonFargateService", {
      cluster: cluster,
      cpu: 512,
      desiredCount: 1,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset('..'),
        containerPort: 3000
      },
      memoryLimitMiB: 2048,
      publicLoadBalancer: true,
      domainName: 'hackathlon.' + zone.zoneName,
      domainZone: zone,
      redirectHTTP: true,
      protocol: ApplicationProtocol.HTTPS
    });
  }
}
