/* eslint-disable */

const example = {
	"account": "123456789012",
	"region": "us-east-1",
	"detail-type": "CodeDeploy Deployment State-change Notification",
	"source": "aws.codedeploy",
	"version": "0",
	"time": "2016-06-30T22:06:31Z",
	"id": "c071bfbf-83c4-49ca-a6ff-3df053957145",
	"resources": [
		"arn:aws:codedeploy:us-east-1:123456789012:application:myApplication",
		"arn:aws:codedeploy:us-east-1:123456789012:deploymentgroup:myApplication/myDeploymentGroup"
	],
	"detail": {
		"instanceGroupId": "9fd2fbef-2157-40d8-91e7-6845af69e2d2",
		"region": "us-east-1",
		"application": "myApplication",
		"deploymentId": "d-123456789",
		"state": "SUCCESS",
		"deploymentGroup": "myDeploymentGroup"
	}
};


require("./_parser_mock")
	.named("codedeployCloudWatch")
	.matchesEvent(example);
